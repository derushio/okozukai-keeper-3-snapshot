import { pgPool } from '#/infrastructures/db/okozukai_keeper_3/db';
import * as schema from '#/infrastructures/db/okozukai_keeper_3/schema';
import { drizzle } from 'drizzle-orm/node-postgres';

/**
 * drizzle postgres client
 */
export const dz = drizzle(pgPool, { schema });
