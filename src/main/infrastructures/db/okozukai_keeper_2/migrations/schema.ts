import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const okozukaiTable = pgTable('OkozukaiTable', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
});

export const user = pgTable('User', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
});

export const okozukaiRule = pgTable('OkozukaiRule', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  title: text('title').notNull(),
  value: integer('value').notNull(),
  mode: text('mode').notNull(),
  spanEvery: text('spanEvery').notNull(),
  spanPeriod: integer('spanPeriod').notNull(),
  date: timestamp('date', { precision: 3, mode: 'string' }).notNull(),
  startTime: timestamp('startTime', { precision: 3, mode: 'string' }).notNull(),
  endTime: timestamp('endTime', { precision: 3, mode: 'string' }),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
});

export const userSession = pgTable('UserSession', {
  id: text('id').primaryKey().notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  accessToken: text('accessToken').notNull(),
  accessTokenExpiredAt: timestamp('accessTokenExpiredAt', {
    precision: 3,
    mode: 'string',
  }).notNull(),
  resetToken: text('resetToken').notNull(),
  resetTokenExpiredAt: timestamp('resetTokenExpiredAt', {
    precision: 3,
    mode: 'string',
  }).notNull(),
});

export const okozukaiHistory = pgTable('OkozukaiHistory', {
  id: text('id').primaryKey().notNull(),
  title: text('title').notNull(),
  date: timestamp('date', { precision: 3, mode: 'string' }).notNull(),
  value: integer('value').notNull(),
  ruleId: text('ruleId').references(() => okozukaiRule.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  okozukaiTableId: text('okozukaiTableId')
    .notNull()
    .references(() => okozukaiTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

export const userPassword = pgTable(
  'UserPassword',
  {
    id: text('id').primaryKey().notNull(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    password: text('password').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updatedAt', {
      precision: 3,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      userIdKey: uniqueIndex('UserPassword_userId_key').on(table.userId),
    };
  },
);
