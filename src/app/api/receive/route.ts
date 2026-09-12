import { NextResponse } from "next/server";
import { all, run, ensureSchema } from "@/lib/db";
import { validateReceiverPayload } from "@/lib/validation";
import { getGift } from "@/lib/gifts";

async function checkVariantStock(
  giftId: string,
  variantId: string
): Promise<boolean> {
  const variant = getGift(giftId)?.variants?.find((v) => v.id === variantId);
  if (!variant) return true;

  const rows = await all<{ count: number }>(
    `SELECT (
      (SELECT COUNT(*) FROM receivers WHERE gift_1 = ? AND gift_1_variant = ?) +
      (SELECT COUNT(*) FROM receivers WHERE gift_2 = ? AND gift_2_variant = ?)
    ) as count`,
    [giftId, variantId, giftId, variantId]
  );
  const count = Number(rows[0]?.count ?? 0);
  return count < variant.limit;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = validateReceiverPayload(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { name, contactNumber, gift1, gift2, gift1Variant, gift2Variant, message } =
    result.data;

  await ensureSchema();

  if (gift1Variant) {
    const ok = await checkVariantStock(gift1, gift1Variant);
    if (!ok) {
      return NextResponse.json(
        { error: "Sorry, that option just sold out. Please choose another." },
        { status: 400 }
      );
    }
  }
  if (gift2Variant) {
    const ok = await checkVariantStock(gift2!, gift2Variant);
    if (!ok) {
      return NextResponse.json(
        { error: "Sorry, that option just sold out. Please choose another." },
        { status: 400 }
      );
    }
  }

  await run(
    "INSERT INTO receivers (name, contact_number, gift_1, gift_2, gift_1_variant, gift_2_variant, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, contactNumber, gift1, gift2, gift1Variant, gift2Variant, message]
  );

  return NextResponse.json({ success: true });
}
