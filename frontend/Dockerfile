FROM node:22.11.0-alpine3.19 AS build

WORKDIR /app

COPY package*.json ./

ARG VITE_API_URL
ARG VITE_GOOGLE_API_KEY
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_GOOGLE_API_KEY=$VITE_GOOGLE_API_KEY

RUN npm install -frozen-lockfile

COPY . .

RUN npm run build

FROM node:22.11.0-alpine3.19

RUN npm install serve -g

WORKDIR /app

COPY --from=build /app/dist ./dist

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]
