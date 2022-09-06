import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/services/auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { Jwt2faStrategy } from 'src/auth/strategies/jwt-2fa.strategy';
import { ConfigService } from '@nestjs/config';
import { ProfileService } from 'src/profile/profile.service';
import { TwoFactorAuthService } from 'src/auth/services/2fa.service';
import { TwoFactorAuthResolver } from 'src/auth/2fa.resolver';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

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
  providers: [Jwt2faStrategy, JwtStrategy, ProfileService, AuthService, TwoFactorAuthService, TwoFactorAuthResolver],
  controllers: [AuthController],
})
export class AuthModule {
}
