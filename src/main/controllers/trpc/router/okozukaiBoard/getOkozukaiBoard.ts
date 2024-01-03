import { t } from '#/controllers/trpc';
import { okozukaiBoardResource } from '#/controllers/trpc/router/okozukaiBoard';
import { response } from '#/controllers/trpc/router/response';
import { dz } from '#/infrastructures/db/okozukai_keeper_3';
import {
  okozukaiBoardHistoriesTable,
  okozukaiBoardsTable,
} from '#/infrastructures/db/okozukai_keeper_3/schema';
import { eq, sql } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const GetOkozukaiBoardRequestZod = z.object({
  id: z.string(),
});

export type GetOkozukaiBoardRequest = z.infer<
  typeof GetOkozukaiBoardRequestZod
>;

export const getOkozukaiBoardRouter = t.router({
  [`${okozukaiBoardResource}/get` as const]: t.procedure
    .input(GetOkozukaiBoardRequestZod)
    .query(async (req) => {
      if (!req.ctx.user) {
        throw new Error('user is not found');
      }

      function buildWhere<T extends PgSelect>(select: T) {
        return select.where(eq(okozukaiBoardsTable.id, req.input.id));
      }

      const okozukaiBoard = (
        await buildWhere(
          dz.select().from(okozukaiBoardsTable).$dynamic(),
        ).limit(1)
      ).shift();

      const okozukaiBoardValuesSum = await (async () => {
        if (!okozukaiBoard) {
          return 0;
        }
        return (
          (
            await dz
              .select({
                sum: sql<number>`sum(value) :: INT`,
              })
              .from(okozukaiBoardHistoriesTable)
              .where(
                eq(
                  okozukaiBoardHistoriesTable.okozukaiBoardId,
                  okozukaiBoard.id,
                ),
              )
          ).shift()?.sum ?? 0
        );
      })();

      return response(req.ctx, {
        okozukaiBoard: okozukaiBoard,
        valuesSum: okozukaiBoardValuesSum,
      });
    }),
});
