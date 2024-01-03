import IndexPageVue from '$/presentations/pages/IndexPage.vue';

import { shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { test } from 'vitest';

test('IndexPageVue', async () => {
  setActivePinia(createPinia());
  shallowMount(IndexPageVue);
});
