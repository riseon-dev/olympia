import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SignInWorkflow } from './sign-in.workflow';
import { SolanaModule } from '../infra/adapters/solana/solana.module';

@Module({
  imports: [ConfigModule, SolanaModule],
  providers: [SignInWorkflow],
  exports: [SignInWorkflow],
})
export class WorkflowsModule {}
