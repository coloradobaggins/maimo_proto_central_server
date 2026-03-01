import { Controller, Get } from '@nestjs/common';
import { PersonDetectorService } from './person-detector.service';

@Controller('person-detector')
export class PersonDetectorController {
  constructor(private readonly personDetectorService: PersonDetectorService) {}

  @Get()
  findAll() {
    return this.personDetectorService.findAll();
  }
}
