import { Worker } from "src/entities/worker.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import * as bcrypt from 'bcrypt';
import { Company } from "src/entities/company.entity";

export class WorkerSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const workerRepository = dataSource.getRepository(Worker);
        const companyRepository = dataSource.getRepository(Company);

        const workers = [
            {
                name: 'João da Silva',
                cpf: '12345678900',
                email: 'joao@example.com',
                password: await bcrypt.hash('password', 10),
                salary: 2000.00,
                score: 412,
                company: await companyRepository.findOne({ where: { id: 1 } })
            },
            {
                name: 'Maria Oliveira',
                cpf: '98765432100',
                email: 'maria@example.com',
                password: await bcrypt.hash('password', 10),
                salary: 4000.00,
                score: 576,
                company: await companyRepository.findOne({ where: { id: 2 } })
            },
            {
                name: 'Patricia Oliveira',
                cpf: '87654321000',
                email: 'patricia@example.com',
                password: await bcrypt.hash('password', 10),
                salary: 8000.00,
                score: 690
            },
            {
                name: 'Evandro Costa',
                cpf: '77654321000',
                email: 'costa@example.com',
                password: await bcrypt.hash('password', 10),
                salary: 3500.00,
                score: 487,
                company: await companyRepository.findOne({ where: { id: 3 } })
            },
            {
                name: 'Alexandre Maia',
                cpf: '66654321000',
                email: 'maia@example.com',
                password: await bcrypt.hash('password', 10),
                salary: 10500.00,
                score: 756
            },
        ];

        const newWorkers = workerRepository.create(workers);
        await workerRepository.save(newWorkers);
    }

}