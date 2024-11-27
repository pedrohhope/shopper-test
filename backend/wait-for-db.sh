#!/bin/sh

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME"; do
  echo "Aguardando o banco de dados... $DB_HOST:$DB_PORT"
  sleep 2
done

echo "Banco de dados disponível. Rodando migrações..."
npm run migration:run

echo "Iniciando a API..."
npm run start:prod
