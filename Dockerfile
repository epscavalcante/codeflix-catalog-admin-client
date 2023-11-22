FROM node:hydrogen-alpine3.16 as builder

WORKDIR /home/node/app

COPY . .

RUN yarn install

RUN yarn build

FROM nginx:1.25.0-alpine3.17-slim

WORKDIR /home/node/app

EXPOSE 80

COPY --from=builder /home/node/app/dist /usr/share/nginx/html