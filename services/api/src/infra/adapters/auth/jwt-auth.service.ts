import { Injectable } from '@nestjs/common';
import { AuthService } from '../../../domain/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService implements AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: { username: string; address: string }): {
    token: string;
    refresh: string;
  } {
    console.log('payload', payload);

    const token = this.jwtService.sign(
      {
        username: payload.username,
        address: payload.address,
      },
      {
        secret: process.env.SERVICE_API_JWT_SECRET_KEY,
        expiresIn: '12h',
      },
    );

    const refresh = this.jwtService.sign(
      {
        username: payload.username,
        address: payload.address,
      },
      {
        secret: process.env.SERVICE_API_JWT_SECRET_KEY,
        expiresIn: '6d',
      },
    );

    console.log(token, 'token');
    console.log(refresh, 'refresh');

    return { token, refresh };
  }
}
