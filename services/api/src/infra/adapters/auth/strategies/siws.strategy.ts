import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { SignInService } from '../../../../domain/sign-in.service';

@Injectable()
export class SiwsStrategy extends PassportStrategy(Strategy, 'siws') {
  constructor(private signInService: SignInService) {
    super();
  }

  async validate(req) {
    const { messageToSign, signature, nonce } = req.body;
    console.log(req.body, 'body');
    if (!messageToSign || !signature || !nonce)
      throw new UnauthorizedException();

    // const parsedMessage = await this.signInService.verifySignature(
    //   messageToSign,
    //   signature,
    //   nonce,
    // );
    const parsedMessage = await this.signInService.verifySignature(signature);

    return parsedMessage;
  }
}
