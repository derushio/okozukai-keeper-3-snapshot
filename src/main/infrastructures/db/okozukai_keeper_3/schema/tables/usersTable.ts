import {
  timestampColumns,
  timestampIdxes,
} from '#/infrastructures/db/okozukai_keeper_3/schema/utils';
import { index, pgTable, text, uuid } from 'drizzle-orm/pg-core';

const tableName = 'users';

/**
 * ユーザーテーブル
 */
export const usersTable = pgTable(
  tableName,
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: text('name').unique().notNull(),
    /** sha512 */
    passwordHash: text('password_hash').notNull(),

    ...timestampColumns(),
  },
  (table) => ({
    name: index().on(table.name),
    password: index().on(table.passwordHash),

    ...timestampIdxes(table),
  }),
);
