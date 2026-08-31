import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureSchema } from "@/lib/db";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

const TABLES = {
  giver: "givers",
  receiver: "receivers",
  charity: "charity_donations",
} as const;

type EntryType = keyof typeof TABLES;

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const type = (body as Record<string, unknown> | null)?.type as
    | EntryType
    | undefined;
  const id = Number((body as Record<string, unknown> | null)?.id);

  if (!type || !(type in TABLES) || !Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  await ensureSchema();
  await getDb().execute({
    sql: `DELETE FROM ${TABLES[type]} WHERE id = ?`,
    args: [id],
  });

  return NextResponse.json({ success: true });
}
