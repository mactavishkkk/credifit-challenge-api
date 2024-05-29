import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkerService } from '../../services/worker.service';
import { WorkerDTO } from '../../entities/dto/worker.dto';

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
  create(@Body() createWorkerDto: WorkerDTO) {
    return this.workerService.create(createWorkerDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateWorkerDto: WorkerDTO) {
    return this.workerService.update(id, updateWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.workerService.remove(id);
  }
}
