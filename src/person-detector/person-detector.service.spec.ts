import { Test, TestingModule } from '@nestjs/testing';
import { PersonDetectorService } from './person-detector.service';

describe('PersonDetectorService', () => {
  let service: PersonDetectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonDetectorService],
    }).compile();

    service = module.get<PersonDetectorService>(PersonDetectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
