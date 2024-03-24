import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getSwaggerDoc } from './services/swaggerDoc';
import {serve, setup} from 'swagger-ui-express';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const swaggerDocument = getSwaggerDoc();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use('/doc', serve, setup(swaggerDocument))
  await app.listen(PORT, () => console.log(`Listening port ${PORT}`));
}
bootstrap();
