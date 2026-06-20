// src/data-source.ts
// import process from "node:process";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { ConfigService } from "@nestjs/config";

export const AppDataSource = new DataSource({
    type: "postgres", // or mysql, sqlite, etc.
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5305,
    database: process.env.DB_DATABASE || 'logger_db',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD|| 'postgres',
    
    synchronize: true, 
    migrationsRun: false,
    migrationsTableName: "migrations",
    migrationsTransactionMode: "all",
    entities: [ __dirname + '/../**/entities/*.entity{.ts,.js}'],
    migrations: [ "/../migrations/**/*{.js,.ts}"],

    // synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',

});


