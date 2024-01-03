import { okozukaiBoardsTable } from '#/infrastructures/db/okozukai_keeper_3/schema/tables/okozukaiBoardsTable';
import {
  timestampColumns,
  timestampIdxes,
} from '#/infrastructures/db/okozukai_keeper_3/schema/utils';
import { date, index, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

const tableName = 'okozukai_board_schedules';

/**
 * おこづかいボードスケジュールテーブル
 */
export const okozukaiBoardSchedulesTable = pgTable(
  tableName,
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    okozukaiBoardId: uuid('okozukai_board_id')
      .notNull()
      .references(() => okozukaiBoardsTable.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),

    title: text('title').notNull(),
    value: integer('value').notNull(),
    type: text('type', {
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
    }),
    firstDate: date('first_date').notNull(),

    ...timestampColumns(),
  },
  (table) => ({
    title: index().on(table.title),
    value: index().on(table.value),
    type: index().on(table.type),
    firstDate: index().on(table.firstDate),

    ...timestampIdxes(table),
  }),
);
