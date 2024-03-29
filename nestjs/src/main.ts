import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from 'src/prisma/prisma.service';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: process.env.NEXTJS_BASE_URL,
      credentials: true,
    },
  });
  app.use(cookieParser());
  app.use(graphqlUploadExpress({ maxFileSize: 5000000, maxFiles: 1 }));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(process.env.NESTJS_PORT);
}

bootstrap();