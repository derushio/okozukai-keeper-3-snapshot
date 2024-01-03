let Env: Record<string, unknown> = {};

try {
  Env = {
    VITE_BUILDED: (import.meta.env.VITE_BUILDED ?? 'false') === 'true',

    VITE_RENDERER_ENV_EXAMPLE: import.meta.env.VITE_RENDERER_ENV_EXAMPLE ?? '',
    VITE_RENDERER_BACKEND_URL: import.meta.env.VITE_RENDERER_BACKEND_URL ?? '',
    VITE_ENV_EXAMPLE: import.meta.env.VITE_ENV_EXAMPLE ?? '',
    VITE_RENDERER_BACKEND_PORT: parseInt(
      import.meta.env.VITE_RENDERER_BACKEND_PORT ?? '8020',
    ),

    VITE_DATABASE_HOST: import.meta.env.VITE_DATABASE_HOST ?? '',
    VITE_DATABASE_PORT: Number(import.meta.env.VITE_DATABASE_PORT ?? '5432'),
    VITE_DATABASE_USER: import.meta.env.VITE_DATABASE_USER ?? '',
    VITE_DATABASE_PASSWORD: import.meta.env.VITE_DATABASE_PASSWORD ?? '',
    VITE_DATABASE_NAME: import.meta.env.VITE_DATABASE_NAME ?? '',
    VITE_DATABASE_URL: import.meta.env.VITE_DATABASE_URL ?? '',
  };
} catch {}

export { Env };
