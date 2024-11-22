FROM node:23.2.0-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

RUN npm run build

FROM node:23.2.0-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/dist ./dist

RUN npm install --production

EXPOSE 8080

CMD ["node", "dist/main"]