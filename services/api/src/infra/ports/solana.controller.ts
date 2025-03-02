import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { SignInWorkflow } from '../../application/sign-in.workflow';
import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from '@solana/wallet-standard-features';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class SolanaSignInInputDto {
  @IsString()
  domain: string;

  @IsString()
  statement: string;

  @IsString()
  version: string;

  @IsString()
  nonce: string;

  @IsString()
  chainId: string;

  @IsString()
  issuedAt: string;

  @IsArray()
  resources: string[];
}

export class SolanaSignInWalletDto {
  @IsString()
  address: string;

  @IsString()
  publicKey: string;
}

export class SolanaSignInOutputDto {
  @ValidateNested()
  account: SolanaSignInWalletDto;

  @IsString()
  signature: string;

  @IsString()
  signedMessage: string;
}

export class SolanaVerifySignInBodyDto {
  @ValidateNested()
  input: SolanaSignInInput;

  @ValidateNested()
  output: SolanaSignInOutput;
}

@Controller('/solana')
export class SolanaController {
  private logger: Logger = new Logger(SolanaController.name);
  constructor(private readonly signInWorkflow: SignInWorkflow) {}

  @Get()
  getHello(): { message: string } {
    return {
      message: 'Hello World!',
    };
  }

  @Get('generate')
  generate(): Promise<SolanaSignInInput> {
    this.logger.log(`Generating sign in data...`);
    return this.signInWorkflow.generateSignInData();
  }

  @Post('verify')
  async verify(@Body() body: SolanaVerifySignInBodyDto) {
    this.logger.log(`Verifying sign in data... ${JSON.stringify(body.input)}`);
    const backendInput = body.input;

    const backendOutput: SolanaSignInOutput = {
      account: {
        ...body.output.account,
        publicKey: Buffer.from(body.output.account.publicKey.toString(), 'hex'),
      },
      // eslint-disable-next-line
      // @ts-ignore
      signature: Buffer.from(body.output.signature.data),
      // eslint-disable-next-line
      // @ts-ignore
      signedMessage: Buffer.from(body.output.signedMessage.data),
    };

    return this.signInWorkflow.verifySignInData(backendInput, backendOutput);
  }
}
