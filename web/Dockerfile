FROM node:18-alpine3.17

WORKDIR /app

COPY . .

RUN rm package-lock.json

# Apaga o arquivo .env caso ele exista
RUN [ ! -e .env ] || rm .env

COPY docker.env .env

RUN npm install

RUN npm run build