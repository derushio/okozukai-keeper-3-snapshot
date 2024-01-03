import { oldPgPool } from '#/infrastructures/db/okozukai_keeper_2/db';
import { drizzle } from 'drizzle-orm/node-postgres';

/**
 * drizzle postgres client
 */
export const oldDz = drizzle(oldPgPool);
