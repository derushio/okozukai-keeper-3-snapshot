import { t } from '#/controllers/trpc';
import { healthcheckResource } from '#/controllers/trpc/router/healthcheck';
import { responseOk } from '#/controllers/trpc/router/response';

export const healthcheckRouter = t.router({
  [`${healthcheckResource}` as const]: t.procedure.query(async (req) => {
    return responseOk(req.ctx);
  }),
});
