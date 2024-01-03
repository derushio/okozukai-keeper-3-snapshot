import { usersTable } from '#/infrastructures/db/okozukai_keeper_3/schema';
import { Entity, EntityResult } from '$/models/Entity';
import { Mutable } from '^/utils/mutable';

export class User extends Entity {
  public constructor(
    public value: Mutable<Omit<typeof usersTable.$inferSelect, 'passwordHash'>>,
  ) {
    super();
  }

  public save(): Promise<EntityResult<this>> {
    throw new Error('Method not implemented.');
  }
  public delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
