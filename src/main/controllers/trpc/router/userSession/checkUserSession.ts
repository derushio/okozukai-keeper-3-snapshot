import { t } from '#/controllers/trpc';
import { responseOk } from '#/controllers/trpc/router/response';
import { userSessionResource } from '#/controllers/trpc/router/userSession';

export const checkUserSessionRouter = t.router({
  [`${userSessionResource}/check` as const]: t.procedure.mutation(
    async (req) => {
      if (!req.ctx.user) {
        throw new Error('userSession is invalid');
      }

      return responseOk(req.ctx);
    },
  ),
});
