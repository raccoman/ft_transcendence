import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '6h' },
      }),
    }),
  ],
  providers: [JwtStrategy, ProfileService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {
}
