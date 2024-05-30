import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { WorkerService } from '../../services/worker.service';
import { CreateWorkerDTO } from '../../entities/dto/worker.dto';
import { UpdateWorkerDTO } from 'src/entities/dto/update-worker.dto';

@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) { }

  @Get()
  findAll() {
    return this.workerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.workerService.findOne(id);
  }

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDTO) {
    return this.workerService.create(createWorkerDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateWorkerDto: UpdateWorkerDTO) {
    return this.workerService.update(id, updateWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.workerService.remove(id);
  }
}
