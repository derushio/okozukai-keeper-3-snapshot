import { okozukaiBoardSchedulesTable } from '#/infrastructures/db/okozukai_keeper_3/schema/tables/okozukaiBoardSchedulesTable';
import { okozukaiBoardsTable } from '#/infrastructures/db/okozukai_keeper_3/schema/tables/okozukaiBoardsTable';
import {
  timestampColumns,
  timestampIdxes,
} from '#/infrastructures/db/okozukai_keeper_3/schema/utils';
import { date, index, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

const tableName = 'okozukai_board_histories';

/**
 * おこづかいボード履歴テーブル
 */
export const okozukaiBoardHistoriesTable = pgTable(
  tableName,
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    okozukaiBoardId: uuid('okozukai_board_id')
      .notNull()
      .references(() => okozukaiBoardsTable.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
    okozukaiBoardScheduleId: uuid('okozukai_board_schedule_id').references(
      () => okozukaiBoardSchedulesTable.id,
      {
        onUpdate: 'set null',
        onDelete: 'set null',
      },
    ),

    date: date('date').notNull(),
    title: text('title').notNull(),
    value: integer('value').notNull(),

    ...timestampColumns(),
  },
  (table) => ({
    date: index().on(table.date),
    title: index().on(table.title),
    value: index().on(table.value),

    ...timestampIdxes(table),
  }),
);
