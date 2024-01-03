<template>
  <!-- おこづかいボード履歴の編集ダイアログ -->
  <q-dialog
    ref="dialogRef"
    v-model="editOkozukaiBoardDialogHistoryStore.isDialogOpen"
  >
    <q-card
      :style="{
        width: '800px',
      }"
    >
      <q-card-section>おこづかい履歴 編集</q-card-section>
      <q-separator />

      <q-card-section>
        <EditOkozukaiBoardHistory />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-if="
            !editOkozukaiBoardDialogHistoryStore.editingOkozukaiBoardHistory
              ?.isPreSave
          "
          flat
          color="negative"
          @click="
            $q.dialog({
              title: '削除確認',
              message: 'このおこづかい履歴を消去しますか？',
              cancel: true,
              persistent: true,
            })
              .onOk(() => {
                editOkozukaiBoardDialogHistoryStore.actions.delete();
              })
              .onCancel(() => {
                // pass
              })
          "
        >
          DELETE
        </q-btn>

        <q-btn
          flat
          color="warning"
          @click="editOkozukaiBoardDialogHistoryStore.actions.cancel()"
        >
          CANCEL
        </q-btn>

        <q-btn
          flat
          color="primary"
          @click="editOkozukaiBoardDialogHistoryStore.actions.save()"
        >
          OK
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import EditOkozukaiBoardHistory from '$/presentations/components/features/okozukaiBoard/EditOkozukaiBoardHistory.vue';

import { useEditOkozukaiBoardDialogHistoryStore } from '$/stores/features/okozukaiBoard/editOkozukaiBoardDialogHistoryStore';

const editOkozukaiBoardDialogHistoryStore =
  useEditOkozukaiBoardDialogHistoryStore();
</script>
