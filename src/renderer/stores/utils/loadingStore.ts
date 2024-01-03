import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';
import { v4 as UUIDv4 } from 'uuid';

/**
 * ローディングストア
 */
export const useLoadingStore = defineStore('loading', () => {
  const q = useQuasar();

  const actions = {
    show: (key?: string) => {
      q.loading.show({
        group: key,
      });
    },
    hide: (key?: string) => {
      q.loading.hide(key);
    },
    async doLoadingAction<T>(fn: () => T) {
      const key = UUIDv4();
      try {
        actions.show(key);
        // eslint-disable-next-line @typescript-eslint/await-thenable
        return await fn();
      } finally {
        actions.hide(key);
      }
    },
  };

  const getters = {};

  return { actions, getters };
});
