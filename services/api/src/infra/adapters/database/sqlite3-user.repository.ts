import { Injectable } from '@nestjs/common';
import { DomainUser, UserRepository } from '../../../domain/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Sqlite3UserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveUser(user: DomainUser): Promise<boolean> {
    const response = await this.userRepository.save(user);
    return !!response;
  }

  findByAddress(address: string): Promise<DomainUser> {
    return this.userRepository.findOne({ where: { address } });
  }

  findAll(): Promise<DomainUser[]> {
    return this.userRepository.find();
  }
}
