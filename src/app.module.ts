import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonDetectorModule } from './person-detector/person-detector.module';

@Module({
  imports: [PersonDetectorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
