import { Env as TsxEnv } from '^/config/env/tsx';
import { Env as ViteEnv } from '^/config/env/vite';

export const Env: typeof TsxEnv =
  ViteEnv.VITE_BUILDED != null ? (ViteEnv as unknown as typeof TsxEnv) : TsxEnv;
