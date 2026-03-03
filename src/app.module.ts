import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonDetectorModule } from './person-detector/person-detector.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      //exclude: ['/api/(.*)'], // no interferir con los endpoints/controladores. Esta ruta queda excluida para servir archivos estaticos.
      exclude: ['/api*wildcard'], // no interferir con los endpoints/controladores. Esta ruta queda excluida para servir archivos estaticos.
    }),
    PersonDetectorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
