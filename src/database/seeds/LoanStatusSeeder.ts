// src/database/seeds/LoanStatusSeeder.ts
import { LoanStatus } from 'src/entities/loan-status.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class LoanStatusSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const loanStatusRepository = dataSource.getRepository(LoanStatus);

    const statuses = [
      { status: 'Aprovado' },
      { status: 'Pendente' },
      { status: 'Reprovado' }
    ];

    const existingStatuses = await loanStatusRepository.find();
    if (existingStatuses.length === 0) {
      const newStatuses = loanStatusRepository.create(statuses);
      await loanStatusRepository.save(newStatuses);
    }
  }
}
