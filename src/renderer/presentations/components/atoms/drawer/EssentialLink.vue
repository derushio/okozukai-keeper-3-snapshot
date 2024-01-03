<template>
  <q-item clickable tag="a" :target="target" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { EssentialLinkProps } from '$/presentations/components/atoms/drawer/EssentialLink';

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  target: '_blank',
  icon: '',
});
</script>
