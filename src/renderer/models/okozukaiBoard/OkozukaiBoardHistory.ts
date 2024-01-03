import { QueryOkozukaiBoardHistoriesRequest } from '#/controllers/trpc/router/okozukaiBoard/okozukaiBoardHistory/queryOkozukaiBoardHistories';
import { okozukaiBoardHistoriesTable } from '#/infrastructures/db/okozukai_keeper_3/schema';
import { trpc } from '$/infrastructures/trpc';
import {
  Entity,
  EntityListResult,
  EntityNullableResult,
  EntityResult,
} from '$/models/Entity';
import { Mutable } from '^/utils/mutable';

/**
 * おこづかいボード履歴 モデル
 */
export class OkozukaiBoardHistory extends Entity {
  public constructor(
    public value: Mutable<typeof okozukaiBoardHistoriesTable.$inferSelect>,
    public isPreSave = false,
  ) {
    super();
  }

  public static async getById(): Promise<
    EntityNullableResult<OkozukaiBoardHistory>
  > {
    throw new Error('Method not implemented.');
  }
  public static async query(args: {
    okozukaiBoardId: string;
    pagination: QueryOkozukaiBoardHistoriesRequest['pagination'];
  }): Promise<EntityListResult<OkozukaiBoardHistory>> {
    const res = await trpc['okozukaiBoardHistory/query'].query({
      okozukaiBoardId: args.okozukaiBoardId,
      pagination: args.pagination,
    });

    return {
      values: res.responseList.map((v) => new OkozukaiBoardHistory(v)),
      allCount: res.allCount,
    };
  }

  public async save(): Promise<EntityResult<this>> {
    this.value = (
      await trpc['okozukaiBoardHistory/upsert'].mutate({ value: this.value })
    ).response;
    return { value: this };
  }
  public async delete(): Promise<void> {
    await trpc['okozukaiBoardHistory/delete'].mutate({ id: this.value.id });
  }
}
