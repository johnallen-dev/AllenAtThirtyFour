import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 4; // 4 hours

function sign(payload: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken(): { value: string; maxAge: number } {
  const exp = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `admin:${exp}`;
  const sig = sign(payload);
  return { value: `${payload}.${sig}`, maxAge: MAX_AGE_SECONDS };
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const separatorIndex = token.lastIndexOf(".");
  if (separatorIndex === -1) return false;
  const payload = token.slice(0, separatorIndex);
  const sig = token.slice(separatorIndex + 1);
  if (!payload || !sig) return false;

  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const exp = Number(payload.split(":")[1]);
  return Number.isFinite(exp) && Date.now() < exp;
}
