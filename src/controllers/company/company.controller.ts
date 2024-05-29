import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyService } from '../../services/company.service';
import { CompanyDTO } from 'src/entities/dto/company.dto';

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
  create(@Body() createCompanyDto: CompanyDTO) {
    return this.companyService.create(createCompanyDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCompanyDto: CompanyDTO) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.companyService.remove(id);
  }
}
