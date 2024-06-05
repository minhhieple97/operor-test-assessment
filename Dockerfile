FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g npm@10.8.0

RUN npm install -g pnpm

RUN pnpm install

COPY . .

CMD [ "pnpm", "run", "start:dev" ]