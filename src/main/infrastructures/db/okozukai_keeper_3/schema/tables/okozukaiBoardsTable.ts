import {
  timestampColumns,
  timestampIdxes,
} from '#/infrastructures/db/okozukai_keeper_3/schema/utils';
import { index, pgTable, text, uuid } from 'drizzle-orm/pg-core';

const tableName = 'okozukai_boards';

/**
 * おこづかいボードテーブル
 */
export const okozukaiBoardsTable = pgTable(
  tableName,
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: text('name').unique().notNull(),

    ...timestampColumns(),
  },
  (table) => ({
    name: index().on(table.name),

    ...timestampIdxes(table),
  }),
);
