import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { UserConfig, defineConfig } from 'vite';

const alias = {
  '&/': `${path.join(__dirname)}/`,
  '$/': `${path.join(__dirname, 'src', 'renderer')}/`,
  '#/': `${path.join(__dirname, 'src', 'main')}/`,
  '^/': `${path.join(__dirname, 'src', 'common')}/`,
};

const MODE: 'FRONTEND' | 'BACKEND' | 'TEST' = (process.env.MODE ??
  'FRONTEND') as 'FRONTEND' | 'BACKEND' | 'TEST';
export const config = {
  envPrefix: ['BACKEND', 'TEST'].includes(MODE) ? 'VITE_' : 'VITE_RENDERER_',
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: './src/renderer/assets/styles/quasar-variables.scss',
    }),
  ],
  resolve: {
    alias: {
      ...alias,
      ...(['BACKEND', 'TEST'].includes(MODE)
        ? {
            electron: path.join(__dirname, 'src', 'main', 'mocks', 'electron'),
          }
        : {}),
    },
  },
  root:
    MODE === 'FRONTEND'
      ? path.join(__dirname, 'src', 'renderer')
      : path.join(__dirname, 'src'),
  envDir: path.join(__dirname),
  build: {
    rollupOptions: {
      input: {
        index: path.join(__dirname, 'src', 'renderer', 'index.html'),
      },
    },
  },
  ...({
    test: {
      environment: 'happy-dom',
      setupFiles: [path.join(__dirname, 'tests', 'renderer.setup.ts')],
      include: [path.join(__dirname, 'tests/**/*.spec.ts')],
      exclude: [],
      coverage: {
        provider: 'v8',
        all: true,
        clean: true,
        reportsDirectory: './_coverage',
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any),
} satisfies UserConfig;

export default defineConfig(config);
