import { Controller, Get, Post } from '@nestjs/common';
import { SignInWorkflow } from '../../application/sign-in.workflow';

@Controller('/solana')
export class SolanaController {
  constructor(private readonly signInWorkflow: SignInWorkflow) {}

  @Get()
  getHello(): { message: string } {
    return {
      message: 'Hello World!',
    };
  }

  @Get('generate')
  generate() {}

  @Post('verify')
  verify() {}
}
