import { Module } from '@nestjs/common';
import { SolanaController } from './solana.controller';
import { SolanaModule } from '../adapters/solana/solana.module';
import { WorkflowsModule } from '../../application/workflows.module';
import { AuthModule } from '../adapters/auth/auth.module';

@Module({
  imports: [SolanaModule, WorkflowsModule, AuthModule],
  providers: [],
  exports: [],
  controllers: [SolanaController],
})
export class ControllersModule {}
