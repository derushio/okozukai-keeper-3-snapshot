import { dz } from '#/infrastructures/db/okozukai_keeper_3';
import { usersTable } from '#/infrastructures/db/okozukai_keeper_3/schema';
import { separate } from '#/infrastructures/db/okozukai_keeper_3/seed/separator';
import { sha512 } from '#/utils/hash';

export const testUserDict = {
  test: {
    name: 'test',
    passwordHash: sha512('test'),
  },
} satisfies Record<string, typeof usersTable.$inferInsert>;

export default async function seedUsers() {
  separate();
  console.info('seedUsers');

  for (const key of Object.keys(testUserDict)) {
    const v = testUserDict[key as keyof typeof testUserDict];
    await dz.insert(usersTable).values(v).onConflictDoUpdate({
      target: usersTable.name,
      set: v,
    });

    console.info('seedUser:', v);
  }
}
