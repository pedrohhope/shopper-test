import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../../domain/entities/*.entity.{js,ts}'],
    migrations: [__dirname + '/migrations/*.{js,ts}'],
    synchronize: false,
});

export default AppDataSource;
