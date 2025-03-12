import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SignInWorkflow } from '../../application/sign-in.workflow';
import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from '@solana/wallet-standard-features';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { SiwsStrategy } from '../adapters/auth/guards/siws-auth.guard';
import { RefreshJwtGuard } from '../adapters/auth/guards/refresh-jwt-auth.guard';
import { JwtGuard } from '../adapters/auth/guards/jwt-auth.guard';

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

  // @Post('verify')
  // async verify(@Body() body: SolanaVerifySignInBodyDto) {
  //   this.logger.log(`Verifying sign in data... ${JSON.stringify(body.input)}`);
  //   const backendInput = body.input;
  //
  //   const backendOutput: SolanaSignInOutput = {
  //     account: {
  //       ...body.output.account,
  //       publicKey: Buffer.from(body.output.account.publicKey.toString(), 'hex'),
  //     },
  //     // eslint-disable-next-line
  //     // @ts-ignore
  //     signature: Buffer.from(body.output.signature.data),
  //     // eslint-disable-next-line
  //     // @ts-ignore
  //     signedMessage: Buffer.from(body.output.signedMessage.data),
  //   };
  //
  //   return this.signInWorkflow.verifySignInData(backendInput, backendOutput);
  // }

  @UseGuards(SiwsStrategy)
  @Post('signup')
  async signUp(@Body() body: SolanaVerifySignInBodyDto) {
    try {
      return await this.signInWorkflow.signUp(body);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(SiwsStrategy)
  @Post('signin')
  async signIn(@Body() body: SolanaVerifySignInBodyDto) {
    try {
      return await this.signInWorkflow.signIn(body);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refresh(@Req() request: Request) {
    try {
      return await this.signInWorkflow.refreshTokenSet({
        address: request['user'].address,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  async getProfile(@Req() request: Request) {
    try {
      return this.signInWorkflow.getUserProfile({
        address: request['user'].address,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
