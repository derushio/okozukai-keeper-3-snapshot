import { User } from '$/models/user/User';
import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * ユーザーストア
 */
export const useUserStore = defineStore('user', () => {
  const user = ref<User>();

  // 注意：refは直接returnしてください
  return {
    user,
  };
});
