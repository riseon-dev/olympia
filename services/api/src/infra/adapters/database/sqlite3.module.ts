import { Module } from '@nestjs/common';
import { UserRepository } from '../../../domain/user.repository';
import { Sqlite3UserRepository } from './sqlite3-user.repository';
import { PrismaService } from './prisma.service';

const sqliteProvider = {
  provide: UserRepository,
  useValue: Sqlite3UserRepository,
};

@Module({
  imports: [],
  providers: [sqliteProvider, PrismaService],
  exports: [UserRepository],
})
export class Sqlite3Module {}
