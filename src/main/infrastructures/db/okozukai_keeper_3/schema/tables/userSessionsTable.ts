import { usersTable } from '#/infrastructures/db/okozukai_keeper_3/schema/tables/usersTable';
import {
  timestampColumns,
  timestampIdxes,
} from '#/infrastructures/db/okozukai_keeper_3/schema/utils';
import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const tableName = 'user_sessions';

/**
 * ユーザーセッションテーブル
 */
export const userSessionsTable = pgTable(
  tableName,
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),

    accessTokenHash: text('access_token_hash').notNull(),
    accessTokenExpireAt: timestamp('access_token_expire_at').notNull(),

    resetTokenHash: text('reset_token_hash').notNull(),
    resetTokenExpireAt: timestamp('reset_token_expire_at').notNull(),

    ...timestampColumns(),
  },
  (table) => ({
    accessTokenHash: index().on(table.accessTokenHash),
    accessTokenExpireAt: index().on(table.accessTokenExpireAt),
    resetTokenHash: index().on(table.resetTokenHash),
    resetTokenExpireAt: index().on(table.resetTokenExpireAt),

    ...timestampIdxes(table),
  }),
);
