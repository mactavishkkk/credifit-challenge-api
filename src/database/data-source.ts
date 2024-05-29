import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import * as dotenv from 'dotenv';
import { Company } from "src/entities/company.entity";
import { Worker } from "src/entities/worker.entity";

dotenv.config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Company, Worker],
    migrations: ['dist/database/migrations/*.js'],
    seeds: ['dist/database/seeds/MainSeeder.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;