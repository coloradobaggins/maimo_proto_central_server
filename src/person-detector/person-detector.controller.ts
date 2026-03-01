import { Controller, Get, Post } from '@nestjs/common';
import { PersonDetectorService } from './person-detector.service';
import { PersonDetectorGateway } from './person-detector.gateway';

@Controller('person-detector')
export class PersonDetectorController {
  constructor(
    private readonly personDetectorService: PersonDetectorService,
    private readonly personDetectorGateway: PersonDetectorGateway,
  ) {}

  @Get()
  findAll() {
    return this.personDetectorService.findAll();
  }

  @Get('config')
  getConfig() {
    return this.personDetectorService.getConfig();
  }

  @Post('config/update')
  notifyUpdate() {
    this.personDetectorGateway.notifyRoom(
      'person-detector-app',
      'config:update',
    );
  }
}
