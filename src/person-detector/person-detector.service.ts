import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import path from 'path';

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

  async getConfig() {
    console.log(`on getConfig...`);

    try {
      const filePath = path.join(
        process.cwd(),
        'config',
        'app-person-detector-config.json',
      );
      const fileContent = await readFile(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (err) {
      console.error(
        `Error leyendo app-person-detector-config.json de disco`,
        err,
      );
    }
  }
}
