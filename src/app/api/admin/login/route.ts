import { NextResponse } from "next/server";
import { createSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const password = String((body as Record<string, unknown> | null)?.password ?? "");

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const { value, maxAge } = createSessionToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return res;
}
