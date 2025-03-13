import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';
import { SiwsStrategy } from './strategies/siws.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthService } from './jwt-auth.service';
import { JwtGuard } from './guards/jwt-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { SiwsAuthGuard } from './guards/siws-auth.guard';

@Module({
  providers: [
    JwtStrategy,
    SiwsStrategy,
    RefreshJwtStrategy,
    JwtAuthService,
    JwtGuard,
    RefreshJwtGuard,
    SiwsAuthGuard,
  ],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SERVICE_API_JWT_SECRET_KEY,
      signOptions: { expiresIn: '6h' },
    }),
  ],
})
export class AuthModule {}
