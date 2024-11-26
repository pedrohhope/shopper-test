FROM node:23.2.0-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-db.sh /usr/src/app/wait-for-db.sh

ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=password
ENV DB_DATABASE=shopperdb

EXPOSE 8080

RUN chmod +x /usr/src/app/wait-for-db.sh

CMD ["./wait-for-db.sh"]
