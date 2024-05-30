import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CompanyService } from '../../services/company.service';
import { CreateCompanyDTO } from 'src/entities/dto/company.dto';
import { UpdateCompanyDTO } from 'src/entities/dto/update-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDTO) {
    return this.companyService.create(createCompanyDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCompanyDto: UpdateCompanyDTO) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.companyService.remove(id);
  }
}
