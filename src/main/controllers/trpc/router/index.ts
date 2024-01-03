import { t } from '#/controllers/trpc';
import { healthcheckRouter } from '#/controllers/trpc/router/healthcheck/healthcheck';
import { getOkozukaiBoardRouter } from '#/controllers/trpc/router/okozukaiBoard/getOkozukaiBoard';
import { deleteOkozukaiBoardHistoryRouter } from '#/controllers/trpc/router/okozukaiBoard/okozukaiBoardHistory/deleteOkozukaiBoardHistory';
import { queryOkozukaiBoardHistoriesRouter } from '#/controllers/trpc/router/okozukaiBoard/okozukaiBoardHistory/queryOkozukaiBoardHistories';
import { upsertOkozukaiBoardHistoryRouter } from '#/controllers/trpc/router/okozukaiBoard/okozukaiBoardHistory/upsertOkozukaiBoardHistory';
import { queryOkozukaiBoardsRouter } from '#/controllers/trpc/router/okozukaiBoard/queryOkozukaiBoards';
import { checkUserSessionRouter } from '#/controllers/trpc/router/userSession/checkUserSession';
import { signinRouter } from '#/controllers/trpc/router/userSession/signin';

export const appTrpcRouter = t.mergeRouters(
  // healthcheck
  healthcheckRouter,
  // userSession
  checkUserSessionRouter,
  signinRouter,
  // okozukaiBoard
  queryOkozukaiBoardsRouter,
  getOkozukaiBoardRouter,
  // okozukaiBoardHistory
  queryOkozukaiBoardHistoriesRouter,
  upsertOkozukaiBoardHistoryRouter,
  deleteOkozukaiBoardHistoryRouter,
);

export type AppRouter = typeof appTrpcRouter;
