import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { vi } from 'vitest';

vi.mock('@trpc/client', () => ({
  createTRPCProxyClient: vi.fn(),
  httpLink: vi.fn(),
}));

vi.mock('vue-query', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}));

installQuasarPlugin();
