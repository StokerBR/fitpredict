FROM node:18-alpine3.16
RUN apk add --no-cache bash

WORKDIR /app

COPY . .

RUN rm package-lock.json

RUN npm install

RUN npx prisma generate

RUN npm run build

# Apaga o arquivo .env caso ele exista
RUN [ ! -e .env ] || rm .env