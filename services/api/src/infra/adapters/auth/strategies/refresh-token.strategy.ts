import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../../domain/user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('SERVICE_API_JWT_SECRET_KEY'),
    });
  }

  async validate(payload: { username: string; address: string }) {
    const client = await this.userRepository.findByAddress(payload.address);

    if (!client) throw new UnauthorizedException();
    return client;
  }
}
