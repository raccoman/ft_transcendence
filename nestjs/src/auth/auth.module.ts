import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { HasuraModule } from 'src/hasura/hasura.module';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      //TODO: Cannot read process.env.JWT_SECRET
      secret: '43b82bd7211ced7855e881181f3d57e14e1d2a1226f310a3dc5248c4ba11c9d8',
      signOptions: { expiresIn: '6h' },
    }),
    HasuraModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
}
