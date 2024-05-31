// src/companies/dto/update-company.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDTO } from './company.dto';

export class UpdateCompanyDTO extends PartialType(CreateCompanyDTO) {}
