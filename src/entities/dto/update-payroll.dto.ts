// src/companies/dto/update-company.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePayrollLoanDTO } from './payroll-loan.dto';

export class UpdatePayrollLoanDTO extends PartialType(CreatePayrollLoanDTO) {}
