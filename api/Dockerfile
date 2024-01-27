FROM node:18-alpine3.17

WORKDIR /app

COPY . .

RUN rm package-lock.json

RUN npm install

RUN npx prisma generate

RUN npm run build

# Apaga o arquivo .env caso ele exista
RUN [ ! -e .env ] || rm .env