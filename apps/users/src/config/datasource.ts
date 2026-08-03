import 'dotenv/config';
import { DataSource } from "typeorm";



export const AppDataSource = new DataSource({

    type: 'postgres', // or mysql, sqlite, etc.
    host: process.env.DB_HOST || 'localhost',

    port: Number(process.env.DB_PORT) || 5301,
    database: process.env.DB_DATABASE || 'openalm_db',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD|| 'postgres',

    synchronize: false,
    migrationsRun: false,
    migrationsTableName: "migrations",
    migrationsTransactionMode: "all",
    // entities: [  '/../**/entities/*.entity{.ts,.js}'],
    entities: [ __dirname + '/../**/entities/*.entity{.ts,.js}'],
    migrations: [ '/../migrations/**/*{.js,.ts}'],

    // synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',

});
