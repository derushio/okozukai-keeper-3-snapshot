FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
COPY ./ /mnt/project
WORKDIR /mnt/project
RUN corepack enable && \
  cp .env.example.prod .env

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base AS frontend
COPY --from=prod-deps /mnt/project/node_modules /mnt/project/node_modules
COPY --from=build /mnt/project/src/renderer/dist /mnt/project/src/renderer/dist
EXPOSE 5173
CMD [ "pnpm", "start:frontend" ]

FROM base AS backend
COPY --from=prod-deps /mnt/project/node_modules /mnt/project/node_modules
EXPOSE 8020
CMD [ "pnpm", "start:backend" ]
