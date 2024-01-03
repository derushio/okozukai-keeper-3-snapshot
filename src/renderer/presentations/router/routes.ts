import { RouteRecordRaw } from 'vue-router';

export interface RouteMetaData {
  needAuth: boolean;
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('$/presentations/layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('$/presentations/pages/index.vue'),
      },
    ],
    meta: {
      needAuth: true,
    } satisfies RouteMetaData,
  },
  {
    path: '/signin',
    component: () => import('$/presentations/layouts/SimpleLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('$/presentations/pages/SigninPage.vue'),
      },
    ],
  },
  {
    path: '/okozukai-boards/:okozukaiBoardId',
    component: () => import('$/presentations/layouts/default.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('$/presentations/pages/okozukaiBoard/OkozukaiBoardPage.vue'),
      },
    ],
    meta: {
      needAuth: true,
    } satisfies RouteMetaData,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('$/presentations/pages/ErrorNotFound.vue'),
  },
];

export default routes;
