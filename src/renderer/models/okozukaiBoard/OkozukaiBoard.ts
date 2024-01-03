import { QueryOkozukaiBoardsRequest } from '#/controllers/trpc/router/okozukaiBoard/queryOkozukaiBoards';
import { okozukaiBoardsTable } from '#/infrastructures/db/okozukai_keeper_3/schema';
import { trpc } from '$/infrastructures/trpc';
import {
  Entity,
  EntityListResult,
  EntityNullableResult,
  EntityResult,
} from '$/models/Entity';
import { Mutable } from '^/utils/mutable';

/**
 * おこづかいボード モデル
 */
export class OkozukaiBoard extends Entity {
  public constructor(
    public value: Mutable<typeof okozukaiBoardsTable.$inferSelect>,
    public valuesSum: number,
  ) {
    super();
  }

  public static async getById(
    id: string,
  ): Promise<EntityNullableResult<OkozukaiBoard>> {
    const res = await trpc['okozukaiBoard/get'].query({ id });
    if (!res.response.okozukaiBoard) {
      throw new Error('res.response.okozukaiBoard is null');
    }

    return {
      value: new OkozukaiBoard(
        res.response.okozukaiBoard,
        res.response.valuesSum,
      ),
    };
  }

  public static async query(
    args: QueryOkozukaiBoardsRequest,
  ): Promise<EntityListResult<OkozukaiBoard>> {
    const res = await trpc['okozukaiBoard/query'].query(args);
    return {
      values: res.responseList.map((v) => new OkozukaiBoard(v, -1)),
      allCount: res.allCount,
    };
  }

  public save(): Promise<EntityResult<this>> {
    throw new Error('Method not implemented.');
  }
  public delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
