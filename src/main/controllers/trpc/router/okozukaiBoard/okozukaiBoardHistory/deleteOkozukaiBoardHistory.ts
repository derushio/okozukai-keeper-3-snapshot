import { t } from '#/controllers/trpc';
import { okozukaiBoardHistoryResource } from '#/controllers/trpc/router/okozukaiBoard/okozukaiBoardHistory';
import { responseOk } from '#/controllers/trpc/router/response';
import { dz } from '#/infrastructures/db/okozukai_keeper_3';
import { okozukaiBoardHistoriesTable } from '#/infrastructures/db/okozukai_keeper_3/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const DeleteOkozukaiBoardHistoryRequestZod = z.object({
  id: z.string(),
});

export type DeleteOkozukaiBoardHistoryRequest = z.infer<
  typeof DeleteOkozukaiBoardHistoryRequestZod
>;

export const deleteOkozukaiBoardHistoryRouter = t.router({
  [`${okozukaiBoardHistoryResource}/delete` as const]: t.procedure
    .input(DeleteOkozukaiBoardHistoryRequestZod)
    .mutation(async (req) => {
      if (!req.ctx.user) {
        throw new Error('user is not found');
      }

      await dz
        .delete(okozukaiBoardHistoriesTable)
        .where(eq(okozukaiBoardHistoriesTable.id, req.input.id));

      return responseOk(req.ctx);
    }),
});
