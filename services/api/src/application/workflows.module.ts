import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SignInWorkflow } from './sign-in.workflow';
import { SolanaModule } from '../infra/adapters/solana/solana.module';
import { Sqlite3Module } from '../infra/adapters/database/sqlite3.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, SolanaModule, Sqlite3Module],
  providers: [SignInWorkflow, JwtService],
  exports: [SignInWorkflow],
})
export class WorkflowsModule {}
