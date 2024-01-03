/**
 * ModelのEntityのベースクラス
 */
export abstract class Entity {
  // public static async getById(): Promise<EntityNullableResult<Entity>> {
  //   throw new Error('Method not implemented.');
  // }
  // public static async query<T>(args: T): Promise<EntityListResult<Entity>> {
  //   args;
  //   throw new Error('Method not implemented.');
  // }

  public abstract save(): Promise<EntityResult<this>>;
  public abstract delete(): Promise<void>;
}

export interface EntityResult<T> {
  value: T;
}

export interface EntityNullableResult<T> {
  value: T | undefined;
}

export interface EntityListResult<T> {
  values: T[];
  allCount: number;
}
