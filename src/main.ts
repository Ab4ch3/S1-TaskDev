import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Nos permite ver solucitudes a nuesto back-end
  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // config services
  const configServices = app.get(ConfigService);

  // Cors
  app.enableCors(CORS);

  // Versioning
  app.setGlobalPrefix('v1');

  await app.listen(configServices.get('APP_PORT') ?? 3000);
  console.log(`🚀 APP RUNNING ON PORT ${await app.getUrl()} 🚀`);
}
void bootstrap();
