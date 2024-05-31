// src/controllers/payroll-loan.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PayrollLoanService } from 'src/services/payroll-loan.service';
import { CreatePayrollLoanDTO } from 'src/entities/dto/payroll-loan.dto';
import { UpdatePayrollLoanDTO } from 'src/entities/dto/update-payroll.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('payrolls')
@Controller('payrolls')
export class PayrollLoanController {
    constructor(private readonly payrollLoanService: PayrollLoanService) { }

    @Get()
    async findAll() {
        return this.payrollLoanService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.payrollLoanService.findOne(id);
    }

    @Post()
    @ApiBody({ type: CreatePayrollLoanDTO })
    async create(@Body() createPayrollLoanDto: CreatePayrollLoanDTO) {
        return this.payrollLoanService.create(createPayrollLoanDto);
    }

    @Put(':id')
    @ApiBody({ type: UpdatePayrollLoanDTO })
    async update(@Param('id') id: number, @Body() updatePayrollLoanDto: UpdatePayrollLoanDTO) {
        return this.payrollLoanService.update(id, updatePayrollLoanDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.payrollLoanService.remove(id);
    }
}
