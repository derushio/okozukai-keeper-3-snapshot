import { dz } from '#/infrastructures/db/okozukai_keeper_3';
import { Env } from '^/config/env';
import { migrate as migratePostgres } from 'drizzle-orm/node-postgres/migrator';
import { app } from 'electron';
import path from 'path';

const paths = [
  'src',
  'main',
  'infrastructures',
  'db',
  'okozukai_keeper_3',
  'migrations',
];

export async function migrate() {
  const migrationsPath = Env.VITE_BUILDED
    ? path.join(app?.getAppPath(), ...paths)
    : path.join('.', ...paths);

  // This will run migrations on the database, skipping the ones already applied
  await migratePostgres(dz, {
    migrationsFolder: migrationsPath,
  });
}
