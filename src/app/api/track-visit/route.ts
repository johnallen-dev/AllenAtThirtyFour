import { NextResponse } from "next/server";
import { run, ensureSchema } from "@/lib/db";

const KNOWN_PATHS = new Set([
  "/",
  "/charity",
  "/gifting",
  "/give",
  "/receive",
]);

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const path = String((body as Record<string, unknown> | null)?.path ?? "");

  if (!KNOWN_PATHS.has(path)) {
    return NextResponse.json({ error: "Invalid path." }, { status: 400 });
  }

  await ensureSchema();
  await run("INSERT INTO page_visits (path) VALUES (?)", [path]);

  return NextResponse.json({ success: true });
}
