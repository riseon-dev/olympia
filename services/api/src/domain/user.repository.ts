export interface DomainUser {
  username: string;
  address: string;
}

export interface UserRepository {
  saveUser(user: DomainUser): Promise<boolean>;
  findByAddress(address: string): Promise<DomainUser>;
  findAll(): Promise<DomainUser[]>;
}

export const UserRepository = Symbol('UserRepository');
