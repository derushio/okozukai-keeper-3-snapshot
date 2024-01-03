<template>
  <FullPage class="row items-center justify-evenly">
    <q-card
      class="q-pa-md"
      :style="{
        width: '800px',
        maxWidth: '95%',
      }"
    >
      <h2 class="q-mb-md display-none">サインイン</h2>
      <q-form class="q-mb-md">
        <q-input
          v-model="signinStore.formData.username"
          label="ユーザー名"
          autocomplete="username"
        />
        <q-input
          v-model="signinStore.formData.password"
          label="パスワード"
          type="password"
          autocomplete="current-password"
        />
      </q-form>

      <div class="row items-center justify-end">
        <q-btn @click="signinStore.actions.signin">Signin</q-btn>
      </div>
    </q-card>
  </FullPage>
</template>

<script lang="ts" setup>
import FullPage from '$/presentations/pageTypes/FullPage.vue';

import { useSigninStore } from '$/stores/features/signinStore';

const signinStore = useSigninStore();
</script>
