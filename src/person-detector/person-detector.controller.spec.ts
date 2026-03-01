import { Test, TestingModule } from '@nestjs/testing';
import { PersonDetectorController } from './person-detector.controller';
import { PersonDetectorService } from './person-detector.service';

describe('PersonDetectorController', () => {
  let controller: PersonDetectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonDetectorController],
      providers: [PersonDetectorService],
    }).compile();

    controller = module.get<PersonDetectorController>(PersonDetectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
