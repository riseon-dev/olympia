import { Injectable } from '@nestjs/common';
import { DomainUser, UserRepository } from '../../../domain/user.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class Sqlite3UserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveUser(user: DomainUser): Promise<boolean> {
    const response = await this.prisma.user.create({ data: user });
    return !!response;
  }

  findByAddress(address: string): Promise<DomainUser> {
    return this.prisma.user.findUniqueOrThrow({ where: { address } });
  }

  findAll(): Promise<DomainUser[]> {
    return this.prisma.user.findMany();
  }
}
