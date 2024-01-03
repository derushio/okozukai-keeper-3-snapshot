import { OkozukaiBoardHistory } from '$/models/okozukaiBoard/OkozukaiBoardHistory';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

/**
 * おこづかいボード履歴編集ストア
 */
export const useEditOkozukaiBoardDialogHistoryStore = defineStore(
  'editOkozukaiBoardDialogHistory',
  () => {
    const editingOkozukaiBoardHistory = ref<OkozukaiBoardHistory>();
    const isDialogOpen = computed(() => !!editingOkozukaiBoardHistory.value);
    const changedAt = ref(new Date());

    const actions = {
      async save() {
        if (!editingOkozukaiBoardHistory.value) {
          throw new Error('editingOkozukaiBoardHistory.value is null');
        }

        await editingOkozukaiBoardHistory.value.save();
        editingOkozukaiBoardHistory.value = undefined;
        changedAt.value = new Date();
      },
      cancel() {
        editingOkozukaiBoardHistory.value = undefined;
      },
      async delete() {
        if (!editingOkozukaiBoardHistory.value) {
          throw new Error('editingOkozukaiBoardHistory.value is null');
        }

        await editingOkozukaiBoardHistory.value.delete();
        editingOkozukaiBoardHistory.value = undefined;
        changedAt.value = new Date();
      },
    };

    // 注意：refは直接returnしてください
    return {
      editingOkozukaiBoardHistory,
      isDialogOpen,
      changedAt,
      actions,
    };
  },
);
