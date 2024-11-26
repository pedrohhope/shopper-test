#!/bin/sh

# Espera até que o banco de dados esteja pronto
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME"; do
  echo "Aguardando o banco de dados... $DB_HOST:$DB_PORT"
  sleep 2
done

# Depois de garantir que o banco está pronto, rodamos as migrações
echo "Banco de dados disponível. Rodando migrações..."
npm run migration:run

# Agora iniciamos a API
echo "Iniciando a API..."
npm run start:prod
