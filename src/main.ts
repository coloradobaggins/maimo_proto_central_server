import { config } from 'dotenv';
config(); //load .env variables
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const ADULT_APP_URL = process.env.ADULT_APP_URL;
  const CHILD_APP_URL = process.env.CHILD_APP_URL;
  console.log(`Adult app url: ${ADULT_APP_URL}`);
  console.log(`Static path: `, join(__dirname, '..', 'public'));
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Deja libre el camino "/" para servir archivos por SereStaticModule. Los controladores ahora usan /api/
  app.enableCors({
    //origin: ['http://localhost:3000', 'http://192.168.0.4:3000'],
    origin: [`${CHILD_APP_URL}`, `${ADULT_APP_URL}`],
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
