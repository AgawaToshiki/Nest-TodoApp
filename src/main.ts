import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from "hbs";
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, "..", "views", "partials"));
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe());
  app.disable('x-powered-by');

  await app.listen(3000);
}
bootstrap();
