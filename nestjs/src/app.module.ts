import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HasuraModule } from './hasura/hasura.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env' }),
    AuthModule,
    HasuraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
