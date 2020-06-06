FROM node:12.16-alpine AS build

ENV CODE /opt/app
WORKDIR ${CODE}

RUN apk add --no-cache make gcc g++ python

COPY . .

RUN yarn install && \
    yarn build && \
    npm rebuild bcrypt --build-from-source && \
    tar -cvf app.tar build yarn.lock

FROM node:12.16-alpine

ENV CODE /opt/app
COPY --from=build ${CODE}/app.tar app.tar

RUN tar -xvf app.tar . \
    && yarn install --pure-lockfile --prod
