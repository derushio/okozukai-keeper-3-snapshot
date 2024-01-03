import { t } from '#/controllers/trpc';
import { okozukaiBoardHistoryResource } from '#/controllers/trpc/router/okozukaiBoard/okozukaiBoardHistory';
import { response } from '#/controllers/trpc/router/response';
import { dz } from '#/infrastructures/db/okozukai_keeper_3';
import { okozukaiBoardHistoriesTable } from '#/infrastructures/db/okozukai_keeper_3/schema';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const UpsertOkozukaiBoardHistoryRequestZod = z.object({
  value: createSelectSchema(okozukaiBoardHistoriesTable),
});

export type UpsertOkozukaiBoardHistoryRequest = z.infer<
  typeof UpsertOkozukaiBoardHistoryRequestZod
>;

export const upsertOkozukaiBoardHistoryRouter = t.router({
  [`${okozukaiBoardHistoryResource}/upsert` as const]: t.procedure
    .input(UpsertOkozukaiBoardHistoryRequestZod)
    .mutation(async (req) => {
      if (!req.ctx.user) {
        throw new Error('user is not found');
      }

      const okozukaiBoardHistory = (
        await dz
          .insert(okozukaiBoardHistoriesTable)
          .values(req.input.value)
          .onConflictDoUpdate({
            target: okozukaiBoardHistoriesTable.id,
            set: req.input.value,
          })
          .returning()
      )[0];

      return response(req.ctx, okozukaiBoardHistory);
    }),
});
