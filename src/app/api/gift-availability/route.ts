import { NextResponse } from "next/server";
import { all, ensureSchema } from "@/lib/db";

export async function GET() {
  await ensureSchema();

  const rows = await all<{
    gift_id: string;
    variant_id: string;
    count: number;
  }>(`
    SELECT gift_id, variant_id, SUM(cnt) as count FROM (
      SELECT gift_1 as gift_id, gift_1_variant as variant_id, COUNT(*) as cnt
      FROM receivers
      WHERE gift_1_variant IS NOT NULL
      GROUP BY gift_1, gift_1_variant

      UNION ALL

      SELECT gift_2 as gift_id, gift_2_variant as variant_id, COUNT(*) as cnt
      FROM receivers
      WHERE gift_2_variant IS NOT NULL
      GROUP BY gift_2, gift_2_variant
    )
    GROUP BY gift_id, variant_id
  `);

  const counts: Record<string, Record<string, number>> = {};
  for (const row of rows) {
    counts[row.gift_id] ??= {};
    counts[row.gift_id][row.variant_id] = Number(row.count);
  }

  return NextResponse.json({ counts });
}
