<template>
  <!-- おこづかいボード -->
  <div>
    <div class="full-width full-height column">
      <q-table
        class="col table full-width overflow-x-hidden"
        flat
        title="履歴"
        :pagination="{
          ...okozukaiBoardStore.okozukaiBoardHistoryPagination,
          rowsNumber:
            okozukaiBoardStore.okozukaiBoardHistoryPaginationRowsNumber,
        }"
        @update:pagination="(v: QueryOkozukaiBoardHistoriesRequest['pagination']) => doPagination({ pagination: v })"
        :columns="columns"
        :rows="okozukaiBoardStore.okozukaiBoardHisotries"
        :rows-per-page-options="[
          okozukaiBoardStore.okozukaiBoardHistoryPagination.rowsPerPage,
        ]"
        :loading="okozukaiBoardStore.okozukaiBoardHisotriesQuery.isFetching"
        @request="doPagination"
        @row-click="
          ({}, {}, index) =>
            okozukaiBoardStore.okozukaiBoardHisotries?.[index] &&
            okozukaiBoardStore.actions.edit(
              okozukaiBoardStore.okozukaiBoardHisotries[index],
            )
        "
      >
        <template v-slot:loading>
          <q-inner-loading showing>
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </template>
      </q-table>

      <EditOkozukaiBoardHistoryDialog />
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditOkozukaiBoardHistoryDialog from '$/presentations/components/features/okozukaiBoard/EditOkozukaiBoardHistoryDialog.vue';

import { QueryOkozukaiBoardHistoriesRequest } from '#/controllers/trpc/router/okozukaiBoard/okozukaiBoardHistory/queryOkozukaiBoardHistories';
import { OkozukaiBoardHistory } from '$/models/okozukaiBoard/OkozukaiBoardHistory';
import { useOkozukaiBoardStore } from '$/stores/features/okozukaiBoard/okozukaiBoardStore';
import { japaneseDateFormats } from '^/utils/dfUtils';
import { format } from 'date-fns';
import { QTableProps } from 'quasar';

const okozukaiBoardStore = useOkozukaiBoardStore();

type Columns = QTableProps['columns'];
const columns: Columns = [
  {
    name: 'date',
    required: true,
    label: '日付',
    field: (row: OkozukaiBoardHistory) => row.value.date,
    format: (val: string) => format(new Date(val), ...japaneseDateFormats),
    sortable: true,
    align: 'right',
    style: 'width: 9em; padding: 0.25em 0.5em;',
    headerStyle: 'width: 9em; padding: 0.25em 0.5em;',
  },
  {
    name: 'title',
    required: true,
    label: '名称',
    field: (row: OkozukaiBoardHistory) => row.value.title,
    sortable: true,
    align: 'left',
    style: 'overflow:hidden; text-overflow:ellipsis; padding: 0.25em 0.5em;',
    headerStyle:
      'overflow:hidden; text-overflow:ellipsis; padding: 0.25em 0.5em;',
  },
  {
    name: 'value',
    required: true,
    label: '収支',
    field: (row: OkozukaiBoardHistory) => row.value.value,
    format: (val: number) => `${val.toLocaleString()}円`,
    sortable: true,
    align: 'right',
    style: 'width: 6.5em; padding: 0.25em 0.5em;',
    headerStyle: 'width: 6.5em; padding: 0.25em 0.5em;',
  },
];

async function doPagination(paginationParam: {
  pagination: QueryOkozukaiBoardHistoriesRequest['pagination'];
}): Promise<void> {
  okozukaiBoardStore.okozukaiBoardHistoryPagination = {
    sortBy: paginationParam.pagination.sortBy,
    descending: paginationParam.pagination.descending,
    page: paginationParam.pagination.page,
    rowsPerPage: paginationParam.pagination.rowsPerPage,
  };
  okozukaiBoardStore.okozukaiBoardHistoryPaginationRowsNumber =
    paginationParam.pagination.rowsNumber;
}
</script>

<style lang="scss" scoped>
.table:deep(.q-table__middle) {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  .q-table {
    table-layout: fixed;
    width: 100%;
    max-width: 100%;

    thead,
    tbody,
    tr {
      width: 100%;
      max-width: 100%;
    }

    td {
      font-size: 0.8em;
    }

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th {
      /* bg color is important for th; just specify one */
      background-color: #eeeeee;
    }

    thead tr th {
      position: sticky;
      z-index: 1;
    }
    thead tr:first-child th {
      top: 0;
    }

    /* this is when the loading indicator appears */
    &.q-table--loading thead tr:last-child th {
      /* height of all previous header rows */
      top: 48px;
    }

    /* prevent scrolling behind sticky top row on focus */
    tbody {
      /* height of all previous header rows */
      scroll-margin-top: 48px;
    }
  }
}
</style>
