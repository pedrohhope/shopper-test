FROM node:23.2.0-alpine AS build

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

RUN npm run build

FROM node:23.2.0-alpine AS production

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/infrastructure/database/seeds/drivers.sql ./seeds/drivers.sql

RUN npm install --production

EXPOSE 8080

CMD ["sh", "-c", "node dist/main & ./run-seed.sh"]
