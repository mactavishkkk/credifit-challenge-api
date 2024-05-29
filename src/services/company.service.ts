import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CompanyDTO } from 'src/entities/dto/company.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) { }

    findAll(): Promise<Company[]> {
        return this.companyRepository.find();
    }

    findOne(id: number): Promise<Company> {
        return this.companyRepository.findOne({ where: { id } });
    }

    create(createCompanyDto: CompanyDTO): Promise<Company> {
        const company = this.companyRepository.create(createCompanyDto);
        return this.companyRepository.save(company);
    }

    update(id: number, updateCompanyDto: CompanyDTO): Promise<Company> {
        return this.companyRepository.save({ ...updateCompanyDto, id });
    }

    remove(id: number): Promise<void> {
        return this.companyRepository.delete(id).then(() => undefined);
    }
}
