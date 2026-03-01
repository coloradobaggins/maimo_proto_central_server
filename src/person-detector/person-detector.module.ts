import { Module } from '@nestjs/common';
import { PersonDetectorService } from './person-detector.service';
import { PersonDetectorController } from './person-detector.controller';
import { PersonDetectorGateway } from './person-detector.gateway';

@Module({
  controllers: [PersonDetectorController],
  providers: [PersonDetectorService, PersonDetectorGateway],
})
export class PersonDetectorModule {}
