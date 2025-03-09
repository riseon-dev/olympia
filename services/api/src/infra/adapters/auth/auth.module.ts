import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';
import { SiwsStrategy } from './strategies/siws.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [JwtStrategy, SiwsStrategy, RefreshJwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SERVICE_API_JWT_SECRET_KEY,
      signOptions: { expiresIn: '6h' },
    }),
    // TypeOrmModule.forFeature([Client]),
  ],
})
export class AuthModule {}
