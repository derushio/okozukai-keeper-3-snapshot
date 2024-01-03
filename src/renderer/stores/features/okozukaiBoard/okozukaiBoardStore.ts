import { QueryOkozukaiBoardHistoriesRequest } from '#/controllers/trpc/router/okozukaiBoard/okozukaiBoardHistory/queryOkozukaiBoardHistories';
import { OkozukaiBoard } from '$/models/okozukaiBoard/OkozukaiBoard';
import { OkozukaiBoardHistory } from '$/models/okozukaiBoard/OkozukaiBoardHistory';
import { useCreateOkozukaiBoardHistoryStore } from '$/stores/features/okozukaiBoard/createOkozukaiBoardHistoryStore';
import { useEditOkozukaiBoardDialogHistoryStore } from '$/stores/features/okozukaiBoard/editOkozukaiBoardDialogHistoryStore';
import { useQuery } from '@tanstack/vue-query';
import { dateShortFormats } from '^/utils/dfUtils';
import { format } from 'date-fns';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';

/**
 * おこづかいボードストア
 */
export const useOkozukaiBoardStore = defineStore('okozukaiBoard', () => {
  const router = useRouter();

  const createOkozukaiBoardHistoryStore = useCreateOkozukaiBoardHistoryStore();
  const editOkozukaiBoardDialogHistoryStore =
    useEditOkozukaiBoardDialogHistoryStore();

  const okozukaiBoardHistoryPagination = ref<
    Omit<QueryOkozukaiBoardHistoriesRequest['pagination'], 'rowsNumber'>
  >({
    sortBy: 'date',
    descending: true,
    page: 1,
    rowsPerPage: 50,
  });
  const okozukaiBoardHistoryPaginationRowsNumber = ref<number | undefined>();

  const okozukaiBoardId = computed(
    () =>
      router.currentRoute.value.params.okozukaiBoardId as string | undefined,
  );
  const featureEnabled = computed(
    () => z.string().safeParse(okozukaiBoardId.value).success,
  );

  const okozukaiBoardQuery = useQuery({
    queryKey: [okozukaiBoardId],
    async queryFn() {
      const res = await OkozukaiBoard.getById(okozukaiBoardId.value as string);
      return res.value;
    },
    enabled: featureEnabled,
  });

  const okozukaiBoardHisotriesQuery = useQuery({
    queryKey: [okozukaiBoardId, okozukaiBoardHistoryPagination],
    async queryFn() {
      const res = await OkozukaiBoardHistory.query({
        okozukaiBoardId: okozukaiBoardId.value as string,
        pagination: okozukaiBoardHistoryPagination.value,
      });
      okozukaiBoardHistoryPaginationRowsNumber.value = res.allCount;
      return res.values;
    },
    enabled: featureEnabled,
  });

  const actions = {
    async createHistory() {
      const okozukaiBoardId = z
        .string()
        .parse(router.currentRoute.value.params.okozukaiBoardId);

      await createOkozukaiBoardHistoryStore.actions.create({
        okozukaiBoardId,
        date: format(new Date(), ...dateShortFormats),
        title: 'test',
        value: 100,
      });
    },
    edit(value: OkozukaiBoardHistory) {
      // useQueryのdataはreadonlyなのでインスタンスを作り直す refetchが設計されているので問題なし
      editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory =
        new OkozukaiBoardHistory(value.value, value.isPreSave);
    },
  };

  watch(
    () => [editOkozukaiBoardDialogHistoryStore.changedAt],
    async () => {
      await okozukaiBoardQuery.refetch();
      await okozukaiBoardHisotriesQuery.refetch();
    },
  );

  // 注意：refは直接returnしてください
  return {
    okozukaiBoardHistoryPagination,
    okozukaiBoardHistoryPaginationRowsNumber,
    okozukaiBoardQuery,
    okozukaiBoard: okozukaiBoardQuery.data,
    okozukaiBoardHisotriesQuery,
    okozukaiBoardHisotries: okozukaiBoardHisotriesQuery.data,
    actions,
  };
});
