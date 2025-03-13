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
import { ConfigModule } from '@nestjs/config';
import { Sqlite3Module } from '../database/sqlite3.module';
import { SolanaModule } from '../solana/solana.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SERVICE_API_JWT_SECRET_KEY,
      signOptions: { expiresIn: '6h' },
    }),
    ConfigModule,
    Sqlite3Module,
    SolanaModule,
  ],
  providers: [
    JwtStrategy,
    SiwsStrategy,
    RefreshJwtStrategy,
    JwtAuthService,
    JwtGuard,
    RefreshJwtGuard,
    SiwsAuthGuard,
  ],
  exports: [JwtAuthService, JwtGuard, RefreshJwtGuard, SiwsAuthGuard],
})
export class AuthModule {}
