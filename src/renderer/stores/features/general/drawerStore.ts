import { OkozukaiBoard } from '$/models/okozukaiBoard/OkozukaiBoard';
import { EssentialLinkProps } from '$/presentations/components/atoms/drawer/EssentialLink';
import { useQuery } from '@tanstack/vue-query';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Home',
    icon: 'home',
    link: '#',
    target: '_self',
  },
];

/**
 * Drawer機能のストア
 */
export const useDrawerStore = defineStore('drawer', () => {
  const leftDrawerOpen = ref(false);

  const okozukaiBoardsQuery = useQuery({
    queryKey: [],
    async queryFn() {
      return (
        await OkozukaiBoard.query({
          limit: 100,
          offset: 0,
        })
      ).values;
    },
  });

  const actions = {
    toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    },
  };

  // 注意：refは直接returnしてください
  return {
    leftDrawerOpen,
    okozukaiBoards: okozukaiBoardsQuery.data,
    okozukaiBoardsQuery,
    essentialLinks,
    actions,
  };
});
