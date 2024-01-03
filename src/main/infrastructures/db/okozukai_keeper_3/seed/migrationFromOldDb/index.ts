import { oldDz } from '#/infrastructures/db/okozukai_keeper_2';
import { okozukaiHistory } from '#/infrastructures/db/okozukai_keeper_2/migrations/schema';
import { dz } from '#/infrastructures/db/okozukai_keeper_3';
import { okozukaiBoardHistoriesTable } from '#/infrastructures/db/okozukai_keeper_3/schema';
import { asc, eq } from 'drizzle-orm';

/**
 * データ移行
 */
async function migrationFromOldDb() {
  const limit = 1000;
  let offset = 0;

  while (true) {
    const res = await oldDz
      .select()
      .from(okozukaiHistory)
      .where(
        eq(
          okozukaiHistory.okozukaiTableId,
          '65106e46-bb48-47bd-98de-2fc3085fb143',
        ),
      )
      .limit(limit)
      .offset(offset)
      .orderBy(asc(okozukaiHistory.date));

    if (res.length <= 0) {
      break;
    }

    for (const record of res) {
      const values: typeof okozukaiBoardHistoriesTable.$inferInsert = {
        okozukaiBoardId: 'ec0d5469-7264-49da-a94f-2b753cb11df9',
        id: record.id,
        date: record.date,
        title: record.title,
        value: record.value,
        updateAt: new Date(),
      };

      await dz
        .insert(okozukaiBoardHistoriesTable)
        .values(values)
        .onConflictDoUpdate({
          target: okozukaiBoardHistoriesTable.id,
          set: values,
        });

      console.log('inserted', record.title);
    }

    offset += limit;
  }
}

void migrationFromOldDb();
