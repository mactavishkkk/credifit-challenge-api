import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollLoan } from 'src/entities/payroll-loan.entity';
import { PayrollLoanController } from './payroll-loan.controller';
import { PayrollLoanService } from 'src/services/payroll-loan.service';

@Module({
    imports: [TypeOrmModule.forFeature([PayrollLoan])],
    controllers: [PayrollLoanController],
    providers: [PayrollLoanService],
})
export class PayrollLoanModule { }
