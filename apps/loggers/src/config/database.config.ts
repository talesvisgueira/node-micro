import process from "node:process";
import { TypeOrmModuleOptions } from '@nestjs/typeorm'


export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5435,
    database: process.env.DB_DATABASE || 'logger_db',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD|| 'postgres',
    entities: [ __dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development'

}