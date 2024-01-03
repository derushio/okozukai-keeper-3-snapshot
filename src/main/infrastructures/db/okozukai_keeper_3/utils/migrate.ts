import { pgPool } from '#/infrastructures/db/okozukai_keeper_3/db';
import { migrate } from '#/infrastructures/db/okozukai_keeper_3/utils/migration';

void migrate().then(async () => {
  // Don't forget to close the connection, otherwise the script will hang
  await pgPool.end();
});
