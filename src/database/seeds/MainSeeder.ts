import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { CompanySeeder } from "./CompanySeeder";
import { WorkerSeeder } from "./WorkerSeeder";
import { LoanStatusSeeder } from "./LoanStatusSeeder";
import { PayrollLoanSeeder } from "./PayrollLoanSeeder";

export class MainSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        await runSeeder(dataSource, CompanySeeder)
        await runSeeder(dataSource, WorkerSeeder)
        await runSeeder(dataSource, LoanStatusSeeder)
        await runSeeder(dataSource, PayrollLoanSeeder)
    }
}