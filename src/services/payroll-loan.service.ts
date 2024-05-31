import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayrollLoan } from 'src/entities/payroll-loan.entity';
import { CreatePayrollLoanDTO } from 'src/entities/dto/payroll-loan.dto';
import { UpdatePayrollLoanDTO } from 'src/entities/dto/update-payroll.dto';

@Injectable()
export class PayrollLoanService {
    constructor(
        @InjectRepository(PayrollLoan)
        private payrollLoanRepository: Repository<PayrollLoan>,
    ) { }

    async create(createPayrollLoanDto: CreatePayrollLoanDTO): Promise<PayrollLoan> {
        const payrollLoan = this.payrollLoanRepository.create(createPayrollLoanDto);
        return this.payrollLoanRepository.save(payrollLoan);
    }

    async findAll(): Promise<PayrollLoan[]> {
        return this.payrollLoanRepository.find();
    }

    async findOne(id: number): Promise<PayrollLoan> {
        const payrollLoan = await this.payrollLoanRepository.findOne({ where: { id } });
        if (!payrollLoan) {
            throw new NotFoundException(`PayrollLoan with id ${id} not found`);
        }
        return payrollLoan;
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
