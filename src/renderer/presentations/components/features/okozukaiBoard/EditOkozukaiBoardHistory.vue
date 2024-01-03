<template>
  <!-- おこづかいボード履歴の編集 -->
  <q-form
    @submit="editOkozukaiBoardDialogHistoryStore.actions.save()"
    ref="formRef"
  >
    <q-input
      label="日付"
      type="text"
      :model-value="
        editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory
          ? format(
              new Date(
                editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory.value.date,
              ),
              ...japaneseDateShortFormats,
            )
          : format(new Date(), ...japaneseDateShortFormats)
      "
      @update:model-value="(v) => update({ date: v as string })"
      mask="date"
      :rules="['date']"
    >
      <template v-slot:append>
        <q-icon cursor-pointer name="event">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              :model-value="
                editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory
                  ? format(
                      new Date(
                        editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory.value.date,
                      ),
                      ...japaneseDateShortFormats,
                    )
                  : format(new Date(), ...japaneseDateShortFormats)
              "
              @update:model-value="(v) => update({ date: v as string })"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input
      label="名称"
      type="text"
      :model-value="
        editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory
          ? editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory
              .value.title
          : ''
      "
      @update:model-value="(v) => update({ title: v as string })"
    />

    <q-input
      label="収支"
      type="number"
      :model-value="
        editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory
          ? editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory
              .value.value
          : 0
      "
      @update:model-value="(v) => update({ value: Number(v as string) })"
    />
  </q-form>
</template>

<script lang="ts" setup>
import { okozukaiBoardHistoriesTable } from '#/infrastructures/db/okozukai_keeper_3/schema';
import { useEditOkozukaiBoardDialogHistoryStore } from '$/stores/features/okozukaiBoard/editOkozukaiBoardDialogHistoryStore';
import { japaneseDateShortFormats } from '^/utils/dfUtils';
import { format } from 'date-fns';

const editOkozukaiBoardDialogHistoryStore =
  useEditOkozukaiBoardDialogHistoryStore();

function update(
  params: Partial<typeof okozukaiBoardHistoriesTable.$inferSelect>,
) {
  if (editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory) {
    editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory.value = {
      ...editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory.value,
      ...params,
    };
  }
}
</script>
