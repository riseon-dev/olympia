import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/user.repository';

@Injectable()
export class Sqlite3UserRepository implements UserRepository {
  saveUser(username: string, address: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findByAddress(address: string): Promise<string | null> {
    throw new Error('Method not implemented.');
  }
}
