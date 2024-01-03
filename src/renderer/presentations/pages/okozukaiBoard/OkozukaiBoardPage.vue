<template>
  <FullPage>
    <h2 class="q-mx-md q-mt-md q-mb-md">
      {{ okozukaiBoardStore.okozukaiBoard?.value.name }}
    </h2>
    <q-card class="q-mx-md q-mb-sm q-pa-md">
      <h3>
        残高:
        {{
          okozukaiBoardStore.okozukaiBoard?.valuesSum.toLocaleString() ?? 0
        }}円
      </h3>
    </q-card>
    <OkozukaiBoard class="col" />

    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="accent"
        @click="okozukaiBoardStore.actions.createHistory()"
      />
    </q-page-sticky>
  </FullPage>
</template>

<script lang="ts" setup>
import OkozukaiBoard from '$/presentations/components/features/okozukaiBoard/OkozukaiBoard.vue';
import FullPage from '$/presentations/pageTypes/FullPage.vue';

import { useOkozukaiBoardStore } from '$/stores/features/okozukaiBoard/okozukaiBoardStore';

const okozukaiBoardStore = useOkozukaiBoardStore();
</script>
