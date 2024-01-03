import type { AppRouter } from '#/controllers/trpc/router/index';
import { UserSessionToken } from '$/models/userSession/UserSessionToken';
import {
  HTTPHeaders,
  Operation,
  createTRPCProxyClient,
  experimental_formDataLink,
  httpLink,
  splitLink,
} from '@trpc/client';
import {
  RequestInitEsque,
  ResponseEsque,
} from '@trpc/client/dist/internals/types';
import { Env } from '^/config/env';
import superjson from 'superjson';

/**
 * 共通ヘッダ
 */
async function headers(opts: { op: Operation }): Promise<HTTPHeaders> {
  opts;

  const token = UserSessionToken.get();

  return {
    'X-Access-Token': token.accessToken,
    'X-Reset-Token': token.resetToken,
  } as HTTPHeaders;
}

/**
 * fetch後のtokenの更新などのためにオーバーライド
 */
async function fetchOverride(
  input: RequestInfo | URL | string,
  init?: RequestInit | RequestInitEsque,
): Promise<ResponseEsque> {
  const res = await fetch(input, init);
  const json = await res.clone().json();
  if (json?.result?.data?.json?.newToken) {
    UserSessionToken.set(json?.result?.data?.json?.newToken);
  }
  return res;
}

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    // Server環境向け
    splitLink({
      condition: (op) => op.input instanceof FormData,
      /**
       * FormData
       */
      true: experimental_formDataLink({
        url: `${Env.VITE_RENDERER_BACKEND_URL}`,
        headers,
        fetch: fetchOverride,
      }),
      /**
       * JSON
       */
      false: httpLink({
        url: `${Env.VITE_RENDERER_BACKEND_URL}`,
        headers,
        fetch: fetchOverride,
      }),
    }),
  ],
});
