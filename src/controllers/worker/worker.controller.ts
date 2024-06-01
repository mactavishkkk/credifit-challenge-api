import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { WorkerService } from '../../services/worker.service';
import { CreateWorkerDTO } from '../../entities/dto/worker.dto';
import { UpdateWorkerDTO } from 'src/entities/dto/update-worker.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Query as ExpressQuery } from 'express-serve-static-core';

@ApiTags('workers')
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

  @Post('search')
  @ApiQuery({ name: 'searchTerm', required: true, type: String, description: 'CPF or name of the worker' })
  findByCpfOrName(@Query() query: ExpressQuery) {
    return this.workerService.findByCpfOrName(query);
  }

  @Post()
  @ApiBody({ type: CreateWorkerDTO })
  create(@Body() createWorkerDto: CreateWorkerDTO) {
    return this.workerService.create(createWorkerDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateWorkerDTO })
  update(@Param('id') id: number, @Body() updateWorkerDto: UpdateWorkerDTO) {
    return this.workerService.update(id, updateWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.workerService.remove(id);
    return { message: `The worker ${id} was successfully deleted.` }
  }
}
