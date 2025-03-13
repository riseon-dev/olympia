import { Injectable } from '@nestjs/common';
import { AuthService } from '../../../domain/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthService implements AuthService {
  private jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = configService.getOrThrow('SERVICE_API_JWT_SECRET_KEY');
  }

  generateAccessToken(payload: { username: string; address: string }): {
    token: string;
    refresh: string;
  } {
    const token = this.jwtService.sign(
      {
        username: payload.username,
        address: payload.address,
      },
      {
        secret: this.jwtSecret,
        expiresIn: '12h',
      },
    );

    const refresh = this.jwtService.sign(
      {
        username: payload.username,
        address: payload.address,
      },
      {
        secret: this.jwtSecret,
        expiresIn: '6d',
      },
    );

    console.log(token, 'token');
    console.log(refresh, 'refresh');

    return { token, refresh };
  }
}
