# okozukai-keeper-3-snapshot

おこづかい管理帳

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
pnpm install
```

```bash
cp .env.example.local .env
```

### Development

#### Server & Client (SPA) 向け

```bash
docker compose up -d
pnpm drizzle:seed
pnpm dev
```

### Note

```text
Storeにコードを寄せてVueはViewに徹する①
https://github.com/derushio/okozukai-keeper-3-snapshot/blob/master/src/renderer/presentations/components/features/okozukaiBoard/EditOkozukaiBoardHistory.vue#L79
https://github.com/derushio/okozukai-keeper-3-snapshot/blob/master/src/renderer/stores/features/okozukaiBoard/editOkozukaiBoardDialogHistoryStore.ts

Storeにコードを寄せてVueはViewに徹する②
https://github.com/derushio/okozukai-keeper-3-snapshot/blob/master/src/renderer/presentations/components/features/okozukaiBoard/OkozukaiBoard.vue
https://github.com/derushio/okozukai-keeper-3-snapshot/blob/master/src/renderer/stores/features/okozukaiBoard/okozukaiBoardStore.ts

モデルクラス (Entityインスタンス＋CRUD＋必要に応じてメソッド)
https://github.com/derushio/okozukai-keeper-3-snapshot/blob/master/src/renderer/models/okozukaiBoard/OkozukaiBoardHistory.ts#L17

API部分 (trpc + drizzle)
https://github.com/derushio/okozukai-keeper-3-snapshot/blob/master/src/main/controllers/trpc/router/okozukaiBoard/okozukaiBoardHistory/upsertOkozukaiBoardHistory.ts#L20
```
