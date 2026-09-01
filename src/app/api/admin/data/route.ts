import { NextRequest, NextResponse } from "next/server";
import { all, ensureSchema } from "@/lib/db";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureSchema();
  const [givers, receivers, charity, visitCount] = await Promise.all([
    all(
      "SELECT id, name, contact_number, item, quantity, message, created_at FROM givers ORDER BY created_at DESC"
    ),
    all(
      "SELECT id, name, contact_number, gift_1, gift_2, message, created_at FROM receivers ORDER BY created_at DESC"
    ),
    all(
      "SELECT id, giving_method, name, code_name, contact_number, donation_type, item, quantity, message, proof_of_payment, created_at FROM charity_donations ORDER BY created_at DESC"
    ),
    all<{ count: number }>("SELECT COUNT(*) as count FROM page_visits"),
  ]);

  const totalQuantity = givers.reduce(
    (sum, r) => sum + Number((r as { quantity?: number }).quantity ?? 0),
    0
  );

  return NextResponse.json({
    givers,
    receivers,
    charity,
    totals: {
      totalGivers: givers.length,
      totalReceivers: receivers.length,
      totalQuantity,
      totalCharityDonations: charity.length,
      totalVisits: Number(visitCount[0]?.count ?? 0),
    },
  });
}
