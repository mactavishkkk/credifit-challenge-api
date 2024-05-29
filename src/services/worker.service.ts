import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from '../entities/worker.entity';
import { WorkerDTO } from 'src/entities/dto/worker.dto';

@Injectable()
export class WorkerService {
    constructor(
        @InjectRepository(Worker)
        private readonly workerRepository: Repository<Worker>,
    ) { }

    findAll(): Promise<Worker[]> {
        return this.workerRepository.find();
    }

    findOne(id: number): Promise<Worker> {
        return this.workerRepository.findOne({ where: { id } });
    }

    create(createWorkerDto: WorkerDTO): Promise<Worker> {
        const worker = this.workerRepository.create(createWorkerDto);
        return this.workerRepository.save(worker);
    }

    update(id: number, updateWorkerDto: WorkerDTO): Promise<Worker> {
        return this.workerRepository.save({ ...updateWorkerDto, id });
    }

    remove(id: number): Promise<void> {
        return this.workerRepository.delete(id).then(() => undefined);
    }
}
