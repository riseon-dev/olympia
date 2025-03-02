import { Injectable, Logger } from '@nestjs/common';
import { SignInService } from '../../../domain/sign-in.service';
import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from '@solana/wallet-standard-features';
import { randomStringForEntropy } from '@stablelib/random';
import { ConfigService } from '@nestjs/config';
import { verifySignIn } from '@solana/wallet-standard-util';

@Injectable()
export class SolanaSignInService implements SignInService {
  private logger: Logger = new Logger(SolanaSignInService.name);
  private frontendUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.frontendUrl = this.configService.getOrThrow<string>('SERVICE_WEB_URL');
  }

  private generateNonce(): string {
    const nonce = randomStringForEntropy(96);
    if (!nonce || nonce.length < 8) {
      throw new Error('Error during nonce creation.');
    }
    return nonce;
  }

  generateSignInData(): Promise<SolanaSignInInput> {
    const now: Date = new Date();
    const uri = this.frontendUrl;
    const currentUrl = new URL(uri);
    const domain = currentUrl.host;

    // Convert the Date object to a string
    const currentDateTime = now.toISOString();
    const signInData: SolanaSignInInput = {
      domain,
      statement:
        'Clicking Sign or Approve only means you have proved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee.',
      version: '1',
      nonce: this.generateNonce(),
      chainId: 'mainnet',
      issuedAt: currentDateTime,
      resources: [this.frontendUrl, 'https://phantom.app/'],
    };

    return Promise.resolve(signInData);
  }

  verifySignInData(
    input: SolanaSignInInput,
    output: SolanaSignInOutput,
  ): boolean {
    const backendInput = input;
    const backendOutput: SolanaSignInOutput = {
      account: {
        ...output.account,
        publicKey: new Uint8Array(output.account.publicKey),
      },
      signature: new Uint8Array(output.signature),
      signedMessage: new Uint8Array(output.signedMessage),
    };

    if (!verifySignIn(backendInput, backendOutput)) {
      this.logger.error('Sign In verification failed!');
      throw new Error('Sign In verification failed!');
    }

    return true;
  }
}
