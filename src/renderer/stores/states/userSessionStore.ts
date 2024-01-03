import type { SigninRequest } from '#/controllers/trpc/router/userSession/signin';
import { trpc } from '$/infrastructures/trpc';
import { User } from '$/models/user/User';
import { useUserStore } from '$/stores/states/userStore';
import { defineStore } from 'pinia';

/**
 * ユーザーセッションストア
 */
export const useUserSessionStore = defineStore('userSession', () => {
  const userStore = useUserStore();

  const actions = {
    async signin(params: SigninRequest): Promise<void> {
      const res = await trpc['userSession/signin'].mutate(params);

      if (!res.newToken) {
        throw new Error('newToken is null');
      }

      userStore.user = new User(res.response.user);
    },
  };

  // 注意：refは直接returnしてください
  return {
    actions,
  };
});
