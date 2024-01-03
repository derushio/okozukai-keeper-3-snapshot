import { Env } from '^/config/env';
import { Pool } from 'pg';

export const oldPgPool = new Pool({
  host: Env.VITE_DATABASE_HOST,
  port: Env.VITE_DATABASE_PORT,
  user: Env.VITE_DATABASE_USER,
  password: Env.VITE_DATABASE_PASSWORD,
  database: 'okozukai_keeper',
});
