import { NewToken } from '#/controllers/trpc/router/response';
import { trpc } from '$/infrastructures/trpc';

/**
 * ユーザーセッション モデル
 * localStorageを介する
 */
export class UserSessionToken {
  public static readonly LOCALSTORAGE_ACCESS_TOKEN_KEY = 'accessToken';
  public static readonly LOCALSTORAGE_RESET_TOKEN_KEY = 'resetToken';

  private constructor() {
    return;
  }

  public static async check(): Promise<void> {
    await trpc['userSession/check'].mutate();
  }

  public static get(): Partial<NewToken> {
    return {
      accessToken:
        localStorage.getItem(this.LOCALSTORAGE_ACCESS_TOKEN_KEY) ?? undefined,
      resetToken:
        localStorage.getItem(this.LOCALSTORAGE_RESET_TOKEN_KEY) ?? undefined,
    };
  }

  public static set(params: NewToken): void {
    localStorage.setItem(
      this.LOCALSTORAGE_ACCESS_TOKEN_KEY,
      params.accessToken,
    );
    localStorage.setItem(this.LOCALSTORAGE_RESET_TOKEN_KEY, params.resetToken);
  }

  public static delete(): void {
    localStorage.removeItem(this.LOCALSTORAGE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.LOCALSTORAGE_RESET_TOKEN_KEY);
  }
}
