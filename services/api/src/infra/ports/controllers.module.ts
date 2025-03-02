import { Module } from '@nestjs/common';
import { SolanaController } from './solana.controller';
import { SolanaModule } from '../adapters/solana/solana.module';

@Module({
  imports: [SolanaModule],
  providers: [],
  exports: [],
  controllers: [SolanaController],
})
export class ControllersModule {}
