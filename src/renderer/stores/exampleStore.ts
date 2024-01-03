import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useExampleStore = defineStore('example', () => {
  const counter = ref(0);

  const actions = {
    doubleCount: () => counter.value * 2,
  };

  // 注意：refは直接returnしてください
  return {
    counter,
    actions,
  };
});
