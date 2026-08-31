import { NextResponse } from "next/server";
import { getDb, ensureSchema } from "@/lib/db";
import { validateCharityPayload } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = validateCharityPayload(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const {
    givingMethod,
    name,
    codeName,
    contactNumber,
    donationType,
    item,
    quantity,
    message,
    proofOfPayment,
  } = result.data;

  await ensureSchema();
  await getDb().execute({
    sql: "INSERT INTO charity_donations (giving_method, name, code_name, contact_number, donation_type, item, quantity, message, proof_of_payment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    args: [
      givingMethod,
      name,
      codeName,
      contactNumber,
      donationType,
      item,
      quantity,
      message,
      proofOfPayment,
    ],
  });

  return NextResponse.json({ success: true });
}
