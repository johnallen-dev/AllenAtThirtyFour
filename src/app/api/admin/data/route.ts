import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureSchema } from "@/lib/db";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureSchema();
  const db = getDb();
  const [givers, receivers, charity] = await Promise.all([
    db.execute(
      "SELECT id, name, contact_number, item, quantity, message, created_at FROM givers ORDER BY created_at DESC"
    ),
    db.execute(
      "SELECT id, name, contact_number, gift_1, gift_2, message, created_at FROM receivers ORDER BY created_at DESC"
    ),
    db.execute(
      "SELECT id, giving_method, name, code_name, contact_number, donation_type, item, quantity, message, proof_of_payment, created_at FROM charity_donations ORDER BY created_at DESC"
    ),
  ]);

  const totalQuantity = givers.rows.reduce(
    (sum, r) => sum + Number(r.quantity ?? 0),
    0
  );

  return NextResponse.json({
    givers: givers.rows,
    receivers: receivers.rows,
    charity: charity.rows,
    totals: {
      totalGivers: givers.rows.length,
      totalReceivers: receivers.rows.length,
      totalQuantity,
      totalCharityDonations: charity.rows.length,
    },
  });
}
