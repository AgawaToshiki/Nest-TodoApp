import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from "hbs";
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './app.filter';
import redis from 'redis';


async function bootstrap() {
  dotenv.config();
  console.log('process.env.NODE_ENV:' + process.env.NODE_ENV);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const sessionSecret = process.env.SESSION_SECRET || 'default_session_secret';
  const RedisStore = require('connect-redis')(session);
  const redisClient = redis.createClient({
    url: process.env.REDIS_URL
  });

  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient }),
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
  app.useGlobalFilters(new HttpExceptionFilter());
  app.disable('x-powered-by');

  await app.listen(3000);
}
bootstrap();
