import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { SolanaSignInService } from '../../solana/solana-sign-in.service';
import { SolanaVerifySignInBodyDto } from '../../../ports/solana.controller';
import { SolanaSignInOutput } from '@solana/wallet-standard-features';

@Injectable()
export class SiwsStrategy extends PassportStrategy(Strategy, 'siws') {
  private logger: Logger = new Logger(SiwsStrategy.name);

  constructor(private readonly signInService: SolanaSignInService) {
    super();
  }

  async validate(req: { body: SolanaVerifySignInBodyDto }) {
    this.logger.debug(
      `Validating SIWS sign in data for ${req.body?.output?.account?.publicKey?.toString()}`,
    );

    const { input, output } = req.body;
    if (!input || !output) throw new UnauthorizedException();

    const formattedOutput: SolanaSignInOutput = {
      account: {
        ...output.account,
        publicKey: Buffer.from(output.account.publicKey.toString(), 'hex'),
      },
      // eslint-disable-next-line
      // @ts-ignore
      signature: Buffer.from(output.signature.data),
      // eslint-disable-next-line
      // @ts-ignore
      signedMessage: Buffer.from(output.signedMessage.data),
    };

    return this.signInService.verifySignInData(input, formattedOutput);
  }
}
