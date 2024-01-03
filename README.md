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
pnpm drizzle:migrate
pnpm dev
```
