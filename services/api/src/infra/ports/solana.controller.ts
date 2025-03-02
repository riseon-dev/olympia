import { Controller, Get } from '@nestjs/common';

@Controller('/solana')
export class SolanaController {
  constructor() {}

  @Get()
  getHello(): { message: string } {
    return {
      message: 'Hello World!',
    };
  }

  @Get('generate')
  generate() {}
}
