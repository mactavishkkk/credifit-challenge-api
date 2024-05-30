import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { CompanyModule } from './controllers/company/company.module';
import { WorkerModule } from './controllers/worker/worker.module';
import { APP_FILTER } from '@nestjs/core';
import { UniqueConstraintExceptionFilter } from './services/exceptions/unique-constraint-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CompanyModule,
    WorkerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: UniqueConstraintExceptionFilter,
    }
  ],
})
export class AppModule {}
