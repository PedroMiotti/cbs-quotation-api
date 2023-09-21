# Build dependencies
FROM node:16-alpine as dependencies

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npx prisma generate

# Build production image
FROM dependencies as builder

RUN npm run build

EXPOSE 5555

CMD npm run start
