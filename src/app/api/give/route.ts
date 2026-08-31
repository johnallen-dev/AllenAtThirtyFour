import { NextResponse } from "next/server";
import { run, ensureSchema } from "@/lib/db";
import { validateGiverPayload } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = validateGiverPayload(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { name, contactNumber, item, quantity, message } = result.data;

  await ensureSchema();
  await run(
    "INSERT INTO givers (name, contact_number, item, quantity, message) VALUES (?, ?, ?, ?, ?)",
    [name, contactNumber, item, quantity, message]
  );

  return NextResponse.json({ success: true });
}
