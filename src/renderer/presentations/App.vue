<template>
  <router-view />
  <!-- <NuxtLayout /> -->
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';

useMeta({
  meta: {
    'apple-mobile-web-app-capable': {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    'mobile-web-app-capable': {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
  },
  link: {
    manifest: {
      rel: 'manifest',
      href: '/manifest.json',
    },
  },
});
</script>

<style lang="scss">
@import '&/node_modules/quasar/dist/quasar.prod.css';
@import '&/node_modules/@quasar/extras/material-icons/material-icons.css';

@import '$/assets/styles/app.scss';
@import '$/assets/styles/quasar-variables.scss';
</style>
