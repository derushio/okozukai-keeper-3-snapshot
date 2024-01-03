import { t } from '#/controllers/trpc';
import { okozukaiBoardResource } from '#/controllers/trpc/router/okozukaiBoard';
import { responseList } from '#/controllers/trpc/router/response';
import { dz } from '#/infrastructures/db/okozukai_keeper_3';
import { okozukaiBoardsTable } from '#/infrastructures/db/okozukai_keeper_3/schema';
import { selectCount } from '#/infrastructures/db/okozukai_keeper_3/schema/utils';
import { PgSelect } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const QueryOkozukaiBoardsRequestZod = z.object({
  limit: z.number().default(100),
  offset: z.number().default(0),
});

export type QueryOkozukaiBoardsRequest = z.infer<
  typeof QueryOkozukaiBoardsRequestZod
>;

export const queryOkozukaiBoardsRouter = t.router({
  [`${okozukaiBoardResource}/query` as const]: t.procedure
    .input(QueryOkozukaiBoardsRequestZod)
    .query(async (req) => {
      if (!req.ctx.user) {
        throw new Error('user is not found');
      }

      function buildWhere<T extends PgSelect>(select: T) {
        return select;
      }

      const okozukaiBoards = await buildWhere(
        dz.select().from(okozukaiBoardsTable).$dynamic(),
      )
        .limit(req.input.limit)
        .offset(req.input.offset);
      const count = (
        await buildWhere(
          dz.select(selectCount()).from(okozukaiBoardsTable).$dynamic(),
        )
      )[0].count;

      return responseList(req.ctx, okozukaiBoards, count);
    }),
});
