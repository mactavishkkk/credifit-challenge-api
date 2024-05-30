import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CreateCompanyDTO } from 'src/entities/dto/company.dto';
import { UpdateCompanyDTO } from 'src/entities/dto/update-company.dto';
import * as bcrypt from 'bcrypt';

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

    async create(createCompanyDto: CreateCompanyDTO): Promise<Company> {
        const company = this.companyRepository.create({
            ...createCompanyDto,
            password: await bcrypt.hash(createCompanyDto.password, 10)
        });
        return this.companyRepository.save(company);
    }

    async update(id: number, updateCompanyDto: UpdateCompanyDTO): Promise<Company> {
        const company = await this.companyRepository.findOneBy({ id });
        if (!company) {
            throw new NotFoundException(`Company with ID ${id} not found`);
        }

        if (updateCompanyDto.password) {
            updateCompanyDto.password = await bcrypt.hash(updateCompanyDto.password, 10);
        }

        Object.assign(company, updateCompanyDto);
        return await this.companyRepository.save(company);
    }

    remove(id: number): Promise<void> {
        return this.companyRepository.delete(id).then(() => undefined);
    }
}
