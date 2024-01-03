import { t } from '#/controllers/trpc';
import { okozukaiBoardHistoryResource } from '#/controllers/trpc/router/okozukaiBoard/okozukaiBoardHistory';
import { responseList } from '#/controllers/trpc/router/response';
import { dz } from '#/infrastructures/db/okozukai_keeper_3';
import { okozukaiBoardHistoriesTable } from '#/infrastructures/db/okozukai_keeper_3/schema';
import { selectCount } from '#/infrastructures/db/okozukai_keeper_3/schema/utils';
import { asc, desc, eq } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const QueryOkozukaiBoardHistoriesRequestZod = z.object({
  okozukaiBoardId: z.string(),
  pagination: z.object({
    sortBy: z.string().nullable(),
    descending: z.boolean(),
    page: z.number(),
    rowsPerPage: z.number(),
    rowsNumber: z.number().optional(),
  }),
});

export type QueryOkozukaiBoardHistoriesRequest = z.infer<
  typeof QueryOkozukaiBoardHistoriesRequestZod
>;

export const queryOkozukaiBoardHistoriesRouter = t.router({
  [`${okozukaiBoardHistoryResource}/query` as const]: t.procedure
    .input(QueryOkozukaiBoardHistoriesRequestZod)
    .query(async (req) => {
      if (!req.ctx.user) {
        throw new Error('user is not found');
      }

      function buildWhere<T extends PgSelect>(select: T) {
        return select.where(
          eq(
            okozukaiBoardHistoriesTable.okozukaiBoardId,
            req.input.okozukaiBoardId,
          ),
        );
      }

      const okozukaiBoardHistories = await buildWhere(
        dz.select().from(okozukaiBoardHistoriesTable).$dynamic(),
      )
        .limit(req.input.pagination.rowsPerPage)
        .offset(
          req.input.pagination.rowsPerPage * (req.input.pagination.page - 1),
        )
        .orderBy(() => {
          const column = req.input.pagination.sortBy
            ? okozukaiBoardHistoriesTable[req.input.pagination.sortBy] ??
              okozukaiBoardHistoriesTable.date
            : okozukaiBoardHistoriesTable.date;
          return !req.input.pagination.sortBy || req.input.pagination.descending
            ? desc(column)
            : asc(column);
        });

      const count = (
        await buildWhere(
          dz.select(selectCount()).from(okozukaiBoardHistoriesTable).$dynamic(),
        )
      )[0].count;

      return responseList(req.ctx, okozukaiBoardHistories, count);
    }),
});
