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

        if (!worker || worker.company == null) {
            throw new NotFoundException(
                'Este trabalhador não possui uma empresa associada',
                'Worker does not have an associated company'
            );
        }

        if (createPayrollLoanDto.totalFinanced > (worker.salary * 0.35)) {
            throw new NotFoundException(
                'Este trabalhador não pode financiar uma quantia maior que 35% do seu salário',
                'This worker cannot finance an amount greater than 35% of his salary'
            );
        }

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
}
