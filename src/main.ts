import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from "hbs";
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      // secret: process.env.APP_SECRET,
      secret: 'secret Key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge:  7 * 24 * 60 * 60 * 1000,
      }
    })
  )
  app.use(passport.initialize());
  app.use(passport.session());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, "..", "views", "partials"));
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe());
  app.disable('x-powered-by');

  await app.listen(3000);
}
bootstrap();
