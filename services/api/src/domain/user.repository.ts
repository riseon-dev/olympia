export interface UserRepository {
  saveUser(username: string, address: string): Promise<boolean>;
  findByAddress(address: string): Promise<string | null>;
}

export const UserRepository = Symbol('UserRepository');
