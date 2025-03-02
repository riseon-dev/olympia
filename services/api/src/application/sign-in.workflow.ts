import { Injectable, Logger } from '@nestjs/common';
import { SolanaSignInService } from '../infra/adapters/solana/solana-sign-in.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SignInWorkflow {
  private logger: Logger = new Logger(SignInWorkflow.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly solanaSignInService: SolanaSignInService,
  ) {}

  async generateSignInData() {
    return await this.solanaSignInService.generateSignInData();
  }

  async verifySignInData(input, output) {
    return this.solanaSignInService.verifySignInData(input, output);
  }
}
