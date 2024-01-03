import { okozukaiBoardHistoriesTable } from '#/infrastructures/db/okozukai_keeper_3/schema';
import { OkozukaiBoardHistory } from '$/models/okozukaiBoard/OkozukaiBoardHistory';
import { useOkozukaiBoardStore } from '$/stores/features/okozukaiBoard/okozukaiBoardStore';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

/**
 * おこづかいボード履歴作成ストア
 */
export const useCreateOkozukaiBoardHistoryStore = defineStore(
  'createOkozukaiBoardHistory',
  () => {
    const okozukaiBoardStore = useOkozukaiBoardStore();

    const actions = {
      async create(value: typeof okozukaiBoardHistoriesTable.$inferInsert) {
        const newOkozukaiBoardHistory = new OkozukaiBoardHistory(
          {
            ...value,
            id: uuidv4(),
            okozukaiBoardScheduleId: null,
            createdAt: new Date(),
            updateAt: new Date(),
          },
          true,
        );

        okozukaiBoardStore.actions.edit(newOkozukaiBoardHistory);
      },
    };

    // 注意：refは直接returnしてください
    return {
      actions,
    };
  },
);
