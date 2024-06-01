import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayrollLoan } from 'src/entities/payroll-loan.entity';
import { CreatePayrollLoanDTO } from 'src/entities/dto/payroll-loan.dto';
import { UpdatePayrollLoanDTO } from 'src/entities/dto/update-payroll.dto';
import { Worker } from 'src/entities/worker.entity';

@Injectable()
export class PayrollLoanService {
    constructor(
        @InjectRepository(PayrollLoan)
        private payrollLoanRepository: Repository<PayrollLoan>,
        @InjectRepository(Worker)
        private readonly workerRepository: Repository<Worker>,
    ) { }

    async findAll(): Promise<PayrollLoan[]> {
        return this.payrollLoanRepository.find({ relations: ['company', 'worker', 'status'] });
    }

    async findOne(id: number): Promise<PayrollLoan> {
        const payrollLoan = await this.payrollLoanRepository.findOne({ where: { id }, relations: ['company', 'worker', 'status'] });
        if (!payrollLoan) {
            throw new NotFoundException(`PayrollLoan with id ${id} not found`);
        }
        return payrollLoan;
    }

    async create(createPayrollLoanDto: CreatePayrollLoanDTO | any): Promise<PayrollLoan | any> {
        const worker = await this.workerRepository.findOne({
            where: { id: createPayrollLoanDto.worker },
            relations: ['company']
        });

        this.checkLoanConditions(worker, createPayrollLoanDto);
        createPayrollLoanDto = this.getStatusScore(worker, createPayrollLoanDto);
        createPayrollLoanDto.createdAt = new Date();
        createPayrollLoanDto.nextDue = new Date(createPayrollLoanDto.createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);

        const payrollLoan = this.payrollLoanRepository.create(createPayrollLoanDto);
        return this.payrollLoanRepository.save(payrollLoan);
    }

    async update(id: number, updatePayrollLoanDto: UpdatePayrollLoanDTO): Promise<PayrollLoan> {
        const payrollLoan = await this.findOne(id);
        Object.assign(payrollLoan, updatePayrollLoanDto);
        return this.payrollLoanRepository.save(payrollLoan);
    }

    async remove(id: number): Promise<void> {
        const payrollLoan = await this.findOne(id);
        await this.payrollLoanRepository.remove(payrollLoan);
    }

    checkLoanConditions(worker: any, createPayrollLoanDto: any) {
        if (!worker || worker.company == null) {
            throw new NotFoundException(
                'Este trabalhador não possui uma empresa associada',
                'Worker does not have an associated company'
            );
        }

        if (createPayrollLoanDto.totalFinanced > (worker.salary * 0.35)) {
            throw new NotFoundException(
                'Este trabalhador não pode financiar uma quantia maior que 35% de seu salário',
                'This worker cannot finance an amount greater than 35% of his salary'
            );
        }
    }

    getStatusScore(worker: any, createPayrollLoanDto: any) {
        const disapprovedStatus = 3;
        const disapprovedStatusDetails = 'Reprovado por falta de score';

        const conditions = this.getConditions();

        for (const condition of conditions) {
            if (
                worker.salary > condition.minSalary &&
                worker.salary <= condition.maxSalary &&
                worker.score < condition.maxScore
            ) {
                createPayrollLoanDto.status = disapprovedStatus;
                createPayrollLoanDto.statusDetails = disapprovedStatusDetails;
                return createPayrollLoanDto;
            }
        }

        createPayrollLoanDto.status = 1;
        createPayrollLoanDto.statusDetails = '';
        return createPayrollLoanDto;
    }

    getConditions() {
        return [
            {
                minSalary: 0, maxSalary: 2000,
                minScore: 0, maxScore: 400
            },
            {
                minSalary: 2000, maxSalary: 4000,
                minScore: 0, maxScore: 500
            },
            {
                minSalary: 4000, maxSalary: 8000,
                minScore: 0, maxScore: 600
            },
            {
                minSalary: 8000, maxSalary: 12000,
                minScore: 0, maxScore: 700
            },
        ];
    }
}