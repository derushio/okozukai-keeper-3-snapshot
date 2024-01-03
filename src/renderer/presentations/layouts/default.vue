<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerStore.actions.toggleLeftDrawer()"
        />

        <q-toolbar-title>Okozukai Keeper 3</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerStore.leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>OkozukaiBoards</q-item-label>

        <DrawerItem
          v-for="(v, i) in drawerStore.okozukaiBoards ?? []"
          :key="i"
          @click="
            $router.push({
              path: `/okozukai-boards/${v.value.id}`,
            })
          "
        >
          {{ v.value.name }}
        </DrawerItem>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import DrawerItem from '$/presentations/components/atoms/drawer/DrawerItem.vue';

import { useDrawerStore } from '$/stores/features/general/drawerStore';

const drawerStore = useDrawerStore();
</script>
