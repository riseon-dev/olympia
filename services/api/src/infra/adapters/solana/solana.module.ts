import { Module } from '@nestjs/common';
import { SolanaSignInService } from './solana-sign-in.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [SolanaSignInService],
  exports: [SolanaSignInService],
})
export class SolanaModule {}
