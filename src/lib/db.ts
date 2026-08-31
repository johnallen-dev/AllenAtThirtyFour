import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

export function getDb(): Client {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    if (!url) {
      throw new Error("TURSO_DATABASE_URL is not set");
    }
    client = createClient({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

async function addColumnIfMissing(
  db: Client,
  table: string,
  column: string,
  type: string
): Promise<void> {
  try {
    await db.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${type};`);
  } catch {
    // column already exists — safe to ignore
  }
}

export async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const db = getDb();
    schemaReady = (async () => {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS givers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          contact_number TEXT NOT NULL,
          item TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          message TEXT,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
      await db.execute(`
        CREATE TABLE IF NOT EXISTS receivers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          contact_number TEXT NOT NULL,
          gift_1 TEXT NOT NULL,
          gift_2 TEXT,
          message TEXT,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
      await db.execute(`
        CREATE TABLE IF NOT EXISTS charity_donations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          giving_method TEXT NOT NULL,
          name TEXT,
          code_name TEXT,
          contact_number TEXT,
          donation_type TEXT NOT NULL,
          item TEXT,
          quantity INTEGER,
          message TEXT,
          proof_of_payment TEXT,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
      await addColumnIfMissing(db, "givers", "message", "TEXT");
      await addColumnIfMissing(db, "receivers", "message", "TEXT");
      await addColumnIfMissing(db, "charity_donations", "code_name", "TEXT");
      await addColumnIfMissing(db, "charity_donations", "message", "TEXT");
      await addColumnIfMissing(db, "charity_donations", "proof_of_payment", "TEXT");
    })();
  }
  return schemaReady;
}
