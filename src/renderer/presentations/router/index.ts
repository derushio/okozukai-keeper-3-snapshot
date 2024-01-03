import { UserSessionToken } from '$/models/userSession/UserSessionToken';
import routes, { RouteMetaData } from '$/presentations/router/routes';
import { createRouter, createWebHashHistory } from 'vue-router';

export function createAppRouter() {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    from;

    const meta = to.meta as unknown as RouteMetaData | undefined;

    if (meta?.needAuth) {
      // sessionチェック
      try {
        await UserSessionToken.check();
      } catch (e) {
        console.error(e);
        return next({
          path: '/signin',
        });
      }
    }

    return next();
  });

  return router;
}
