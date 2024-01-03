import { BuildColumns, sql } from 'drizzle-orm';
import {
  PgColumnBuilderBase,
  PgTableExtraConfig,
  index,
  timestamp,
} from 'drizzle-orm/pg-core';

export function timestampColumns() {
  return {
    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    updateAt: timestamp('updated_at', {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  } satisfies Record<string, PgColumnBuilderBase>;
}

export function timestampIdxes<
  TTableName extends string,
  TColumnsMap extends
    | Record<string, PgColumnBuilderBase>
    | ReturnType<typeof timestampColumns>,
>(table: BuildColumns<TTableName, TColumnsMap, 'pg'>) {
  return {
    createdAt: index().on(table.createdAt),
    updatedAt: index().on(table.updateAt),
  } satisfies PgTableExtraConfig;
}

export function selectCount() {
  return {
    count: sql<number>`count(*) :: INT`,
  } as const;
}
