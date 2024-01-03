import { createContext } from '#/controllers/trpc';
import { userSessionsTable } from '#/infrastructures/db/okozukai_keeper_3/schema';

type NotArray<U> = U extends Array<unknown> ? never : U;

export type ResponseType<U> = NotArray<U> | U[];

/**
 * 新しいトークンが生成されたときのみ返す値
 */
export interface NewToken {
  accessToken: string;
  resetToken: string;
}

export function response<U>(
  ctx: Awaited<ReturnType<typeof createContext>>,
  response: NotArray<U>,
): {
  session: typeof userSessionsTable.$inferSelect | undefined;
  newToken?: {
    accessToken: string;
    resetToken: string;
  };
  response: NotArray<U>;
} {
  return {
    session: ctx.session,
    newToken: ctx.newToken,
    response: response,
  };
}

export function responseList<U>(
  ctx: Awaited<ReturnType<typeof createContext>>,
  responseList: U[],
  allCount: number,
): {
  session: typeof userSessionsTable.$inferSelect | undefined;
  newToken?: {
    accessToken: string;
    resetToken: string;
  };
  responseList: U[];
  allCount: number;
} {
  return {
    session: ctx.session,
    newToken: ctx.newToken,
    responseList: responseList,
    allCount,
  };
}

export function responseOk(ctx: Awaited<ReturnType<typeof createContext>>) {
  return {
    session: ctx.session,
    newToken: ctx.newToken,
    response: {
      status: 'OK',
    },
  };
}
