import { Module } from '@nestjs/common';
import { PersonDetectorService } from './person-detector.service';
import { PersonDetectorController } from './person-detector.controller';

@Module({
  controllers: [PersonDetectorController],
  providers: [PersonDetectorService],
})
export class PersonDetectorModule {}
