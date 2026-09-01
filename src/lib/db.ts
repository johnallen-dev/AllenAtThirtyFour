import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getDb(): D1Database {
  const { env } = getCloudflareContext();
  return env.DB;
}

export async function run(sql: string, args: unknown[] = []): Promise<void> {
  await getDb()
    .prepare(sql)
    .bind(...args)
    .run();
}

export async function all<T = Record<string, unknown>>(
  sql: string,
  args: unknown[] = []
): Promise<T[]> {
  const { results } = await getDb()
    .prepare(sql)
    .bind(...args)
    .all<T>();
  return results;
}

async function exec(sql: string): Promise<void> {
  await getDb().prepare(sql).run();
}

async function addColumnIfMissing(
  table: string,
  column: string,
  type: string
): Promise<void> {
  try {
    await exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
  } catch {
    // column already exists — safe to ignore
  }
}

let schemaReady: Promise<void> | null = null;

export async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await exec(`
        CREATE TABLE IF NOT EXISTS givers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          contact_number TEXT NOT NULL,
          item TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          message TEXT,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
      `);
      await exec(`
        CREATE TABLE IF NOT EXISTS receivers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          contact_number TEXT NOT NULL,
          gift_1 TEXT NOT NULL,
          gift_2 TEXT,
          message TEXT,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
      `);
      await exec(`
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
        )
      `);
      await exec(`
        CREATE TABLE IF NOT EXISTS page_visits (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          path TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
      `);
      await addColumnIfMissing("givers", "message", "TEXT");
      await addColumnIfMissing("receivers", "message", "TEXT");
      await addColumnIfMissing("charity_donations", "code_name", "TEXT");
      await addColumnIfMissing("charity_donations", "message", "TEXT");
      await addColumnIfMissing("charity_donations", "proof_of_payment", "TEXT");
    })();
  }
  return schemaReady;
}
