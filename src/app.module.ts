import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './controllers/app/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
