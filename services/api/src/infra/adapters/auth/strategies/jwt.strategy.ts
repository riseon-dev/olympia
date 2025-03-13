import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../../domain/user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('SERVICE_API_JWT_SECRET_KEY'),
    });
  }

  async validate(payload: { username: string; address: string }) {
    console.log(payload);

    const client = await this.userRepository.findByAddress(payload.address);

    console.log(client);

    if (!client) throw new UnauthorizedException();
    return client;
  }
}
