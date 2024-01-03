<template>
  <!-- Blur付きQImg -->
  <div class="overflow-hidden">
    <q-img
      :src="src"
      :fit="fit"
      :position="position"
      :ratio="ratio"
      :style="{
        width: '100%',
        height: 'calc(100% - 2px)',
        position: 'relative',
        transform: 'translate(0, 1px)',
        zIndex: 1,
      }"
    />
    <div
      :class="`absolute-full ${effectClass}`"
      :style="{
        zIndex: 2,
        ...effectStyle as Record<string, unknown>,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { VueStyleObjectProp } from 'quasar';

const props = defineProps<{
  src?: string;
  fit?: 'fill' | 'cover' | 'contain' | 'none' | 'scale-down' | undefined;
  position?: string;
  ratio?: number;
  effectClass?: string;
  effectStyle?: VueStyleObjectProp;
}>();
props;

// const emit = defineEmits<{}>();
// emit;
</script>
