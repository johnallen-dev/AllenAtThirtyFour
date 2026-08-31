import { NextResponse } from "next/server";
import { getDb, ensureSchema } from "@/lib/db";
import { validateReceiverPayload } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = validateReceiverPayload(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { name, contactNumber, gift1, gift2, message } = result.data;

  await ensureSchema();
  await getDb().execute({
    sql: "INSERT INTO receivers (name, contact_number, gift_1, gift_2, message) VALUES (?, ?, ?, ?, ?)",
    args: [name, contactNumber, gift1, gift2, message],
  });

  return NextResponse.json({ success: true });
}
