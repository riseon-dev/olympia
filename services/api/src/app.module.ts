import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from './infra/ports/controllers.module';
import { WorkflowsModule } from './application/workflows.module';

@Module({
  imports: [ConfigModule.forRoot(), ControllersModule, WorkflowsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
