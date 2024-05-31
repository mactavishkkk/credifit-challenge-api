import { Company } from "src/entities/company.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import * as bcrypt from 'bcrypt';

export class CompanySeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const companyRepository = dataSource.getRepository(Company);

        const companies = [
            {
                cnpj: '12345678000190',
                companyName: 'Empresa 1',
                email: 'empresa1@example.com',
                password: await bcrypt.hash('password', 10),
            },
            {
                cnpj: '98765432000198',
                companyName: 'Empresa 2',
                email: 'empresa2@example.com',
                password: await bcrypt.hash('password', 10),
            },
        ];

        const newCompanies = companyRepository.create(companies);
        await companyRepository.save(newCompanies);
    }

}