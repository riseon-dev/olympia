import { Module } from '@nestjs/common';
import { SolanaController } from './solana.controller';
import { SolanaModule } from '../adapters/solana/solana.module';
import { WorkflowsModule } from '../../application/workflows.module';

@Module({
  imports: [SolanaModule, WorkflowsModule],
  providers: [],
  exports: [],
  controllers: [SolanaController],
})
export class ControllersModule {}
