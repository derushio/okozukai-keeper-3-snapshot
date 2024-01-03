import { configDotenv } from 'dotenv';

let env: Record<string, string | undefined> = {};
try {
  configDotenv();
  env = process.env;
} catch {}

export const Env = {
  VITE_BUILDED: (env.VITE_BUILDED ?? 'false') === 'true',

  VITE_RENDERER_ENV_EXAMPLE: env.VITE_RENDERER_ENV_EXAMPLE ?? '',
  VITE_ENV_EXAMPLE: env.VITE_ENV_EXAMPLE ?? '',
  VITE_RENDERER_BACKEND_URL: env.VITE_RENDERER_BACKEND_URL ?? '',
  VITE_RENDERER_BACKEND_PORT: parseInt(
    env.VITE_RENDERER_BACKEND_PORT ?? '8020',
  ),

  VITE_DATABASE_HOST: env.VITE_DATABASE_HOST ?? '',
  VITE_DATABASE_PORT: Number(env.VITE_DATABASE_PORT ?? '5432'),
  VITE_DATABASE_USER: env.VITE_DATABASE_USER ?? '',
  VITE_DATABASE_PASSWORD: env.VITE_DATABASE_PASSWORD ?? '',
  VITE_DATABASE_NAME: env.VITE_DATABASE_NAME ?? '',
  VITE_DATABASE_URL: env.VITE_DATABASE_URL ?? '',
};
