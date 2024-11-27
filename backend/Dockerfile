FROM node:22.11.0-alpine3.19 AS builder

RUN apk add --no-cache bash git

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

COPY wait-for-db.sh /usr/src/app/wait-for-db.sh

FROM node:22.11.0-alpine3.19

RUN apk add --no-cache postgresql-client bash

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/wait-for-db.sh .

EXPOSE 8080

RUN chmod +x /usr/src/app/wait-for-db.sh

CMD ["./wait-for-db.sh"]
