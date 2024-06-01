import { PayrollLoan } from 'src/entities/payroll-loan.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Company } from 'src/entities/company.entity';
import { Worker } from 'src/entities/worker.entity';
import { LoanStatus } from 'src/entities/loan-status.entity';

export class PayrollLoanSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const companyRepository = dataSource.getRepository(Company);
    const workerRepository = dataSource.getRepository(Worker);
    const loanStatusRepository = dataSource.getRepository(LoanStatus);
    const payrollLoanRepository = dataSource.getRepository(PayrollLoan);

    const companies = await companyRepository.find();
    const workers = await workerRepository.find();
    const statuses = await loanStatusRepository.find();

    const loans = [
      {
        company: companies[0],
        worker: workers[0],
        status: statuses[0],
        statusDetails: '',
        nextDue: new Date('2024-06-30'),
        numberInstallments: 12,
        installmentValue: 250.00,
        totalFinanced: 3000.00,
      },
      {
        company: companies[1],
        worker: workers[1],
        status: statuses[1],
        statusDetails: '',
        nextDue: new Date('2024-07-15'),
        numberInstallments: 24,
        installmentValue: 200.00,
        totalFinanced: 4800.00,
      },
      {
        company: companies[2],
        worker: workers[2],
        status: statuses[2],
        statusDetails: 'Reprovado por score',
        nextDue: new Date('2024-08-20'),
        numberInstallments: 5,
        installmentValue: 200.00,
        totalFinanced: 2200.00,
      }
    ];

    const newLoans = payrollLoanRepository.create(loans);
    await payrollLoanRepository.save(newLoans);
  }
}
