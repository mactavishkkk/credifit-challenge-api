import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, Repository } from 'typeorm';
import { Worker } from '../entities/worker.entity';
import { CreateWorkerDTO } from 'src/entities/dto/worker.dto';
import { UpdateWorkerDTO } from 'src/entities/dto/update-worker.dto';

import * as bcrypt from 'bcrypt';
import { Query } from 'express-serve-static-core';

@Injectable()
export class WorkerService {
    constructor(
        @InjectRepository(Worker)
        private readonly workerRepository: Repository<Worker>,
    ) { }

    findAll(): Promise<Worker[]> {
        return this.workerRepository.find({ relations: ['company'] });
    }

    findOne(id: number): Promise<Worker> {
        return this.workerRepository.findOne({ where: { id }, relations: ['company'] });
    }

    async findByCpfOrName(query: Query) {
        const searchTerm = query.searchTerm + '';

        const workers = await this.workerRepository.find({
            where: [
                { cpf: Like(`%${searchTerm}%`) },
                { name: Like(`%${searchTerm}%`) },
                { company: null }
            ],
            relations: ['company']
        });

        if (workers.length === 0) {
            throw new NotFoundException(`Worker with cpf/name containing "${searchTerm}" not found`);
        }

        return workers;
    }

    async create(createWorkerDto: CreateWorkerDTO): Promise<Worker> {
        const worker = this.workerRepository.create({
            ...createWorkerDto,
            password: await bcrypt.hash(createWorkerDto.password, 10)
        });
        return this.workerRepository.save(worker);
    }

    async update(id: number, updateWorkerDto: UpdateWorkerDTO): Promise<Worker> {
        const worker = await this.workerRepository.findOneBy({ id });

        if (!worker) {
            throw new NotFoundException(`Worker with ID ${id} not found`);
        }

        if (updateWorkerDto.password) {
            updateWorkerDto.password = await bcrypt.hash(updateWorkerDto.password, 10);
        }

        Object.assign(worker, updateWorkerDto);
        return await this.workerRepository.save(worker);
    }

    remove(id: number): Promise<void> {
        return this.workerRepository.delete(id).then(() => undefined);
    }
}
