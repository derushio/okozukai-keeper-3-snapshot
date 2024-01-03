<template>
  <!-- 画面いっぱいのスクロールさせないページ -->
  <q-page class="column">
    <slot />
  </q-page>
</template>

<style lang="scss">
html,
body,
#app,
#q-app,
.q-layout,
.q-page-container,
.q-page {
  height: 100%;
}

.q-page-container {
  overflow: hidden;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
