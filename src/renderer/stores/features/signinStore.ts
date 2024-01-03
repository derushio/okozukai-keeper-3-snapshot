import { OkozukaiBoard } from '$/models/okozukaiBoard/OkozukaiBoard';
import { useUserSessionStore } from '$/stores/states/userSessionStore';
import { useLoadingStore } from '$/stores/utils/loadingStore';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Signinのストア
 */
export const useSigninStore = defineStore('signin', () => {
  const router = useRouter();

  const loadingStore = useLoadingStore();
  const userSessionStore = useUserSessionStore();

  const formData = ref({
    username: '',
    password: '',
  });

  const actions = {
    async signin() {
      await loadingStore.actions.doLoadingAction(async () => {
        await userSessionStore.actions.signin({
          username: formData.value.username,
          password: formData.value.password,
        });

        const okozukaiBoard = (
          await OkozukaiBoard.query({
            limit: 1,
            offset: 0,
          })
        ).values.shift();

        if (!okozukaiBoard) {
          throw new Error('okozukaiBoard is null');
        }

        await router.push({
          path: `/okozukai-boards/${okozukaiBoard.value.id}`,
        });
      });
    },
  };

  // 注意：refは直接returnしてください
  return {
    formData,
    actions,
  };
});
