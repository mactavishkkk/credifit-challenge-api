import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { CompanySeeder } from "./CompanySeeder";
import { WorkerSeeder } from "./WorkerSeeder";

export class MainSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        await runSeeder(dataSource, CompanySeeder)
        await runSeeder(dataSource, WorkerSeeder)
    }
}