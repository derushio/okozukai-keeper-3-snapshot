import { Env } from '^/config/env';
import type { Config } from 'drizzle-kit';
import path from 'path';

export default {
  schema: path.relative(
    __dirname,
    path.join(
      __dirname,
      'src',
      'main',
      'infrastructures',
      'db',
      'okozukai_keeper_3',
      'schema',
      'index.ts',
    ),
  ),
  out: path.relative(
    __dirname,
    path.join(
      __dirname,
      'src',
      'main',
      'infrastructures',
      'db',
      'okozukai_keeper_3',
      'migrations',
    ),
  ),
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: Env.VITE_DATABASE_HOST,
    port: Env.VITE_DATABASE_PORT,
    user: Env.VITE_DATABASE_USER,
    password: Env.VITE_DATABASE_PASSWORD,
    database: Env.VITE_DATABASE_NAME,
  },
} satisfies Config;
