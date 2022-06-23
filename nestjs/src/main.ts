import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.NEXTJS_BASE_URL],
    credentials: true,
  });
  await app.listen(process.env.NESTJS_PORT);
}

bootstrap();
