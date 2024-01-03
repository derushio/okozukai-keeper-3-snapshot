import seedUsers from '#/infrastructures/db/okozukai_keeper_3/seed/data/seedUsers';

/**
 * upsertでseedする
 */
export async function seed() {
  await seedUsers();
}
