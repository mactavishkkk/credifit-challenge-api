import { Worker } from "src/entities/worker.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class WorkerSeeder implements Seeder {
    track?: boolean;
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const workerRepository = dataSource.getRepository(Worker);

        const workers = [
            {
                name: 'João da Silva',
                cpf: '12345678900',
                email: 'joao@example.com',
                password: 'password',
                salary: 3000.00,
                companyId: 1
            },
            {
                name: 'Maria Oliveira',
                cpf: '98765432100',
                email: 'maria@example.com',
                password: 'password',
                salary: 3500.00,
                companyId: 2
            },
            {
                name: 'Patricia Oliveira',
                cpf: '87654321000',
                email: 'patricia@example.com',
                password: 'password',
                salary: 3500.00,
            },
        ];

        const newWorkers = workerRepository.create(workers);
        await workerRepository.save(newWorkers);
    }
    
}