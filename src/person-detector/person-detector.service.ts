import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonDetectorService {
  create() {
    return 'This action adds a new personDetector';
  }

  findAll() {
    return `This action returns all personDetector`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personDetector`;
  }

  update(id: number) {
    return `This action updates a #${id} personDetector`;
  }

  remove(id: number) {
    return `This action removes a #${id} personDetector`;
  }
}
