import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  console.log(`Static path: `, join(__dirname, '..', 'public'));
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Deja libre el camino "/" para servir archivos por SereStaticModule. Los controladores ahora usan /api/
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
