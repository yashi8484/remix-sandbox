FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/

RUN corepack enable pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]
