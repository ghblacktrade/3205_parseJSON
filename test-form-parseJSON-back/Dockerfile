FROM node:alpine

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build

ENTRYPOINT [ "yarn", "start:prod" ]
