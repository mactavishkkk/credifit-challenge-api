// src/companies/dto/update-company.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerDTO } from './worker.dto';


export class UpdateWorkerDTO extends PartialType(CreateWorkerDTO) {}
