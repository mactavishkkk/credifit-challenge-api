import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerService } from '../../services/worker.service';
import { WorkerController } from './worker.controller';
import { Worker } from '../../entities/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule { }
