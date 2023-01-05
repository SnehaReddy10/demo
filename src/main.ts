import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users/users.module';
const cookieSession = require('cookie-session');


async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.use(
    cookieSession({
      keys: ['asxjnsj']
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({whitelist: true}),
  );
  await app.listen(3000);
}
bootstrap();
