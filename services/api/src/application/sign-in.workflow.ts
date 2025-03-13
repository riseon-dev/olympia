import { Inject, Injectable, Logger } from '@nestjs/common';
import { SolanaSignInService } from '../infra/adapters/solana/solana-sign-in.service';
import { ConfigService } from '@nestjs/config';
import { DomainUser, UserRepository } from '../domain/user.repository';
import { JwtService } from '@nestjs/jwt';
import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from '@solana/wallet-standard-features';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  NumberDictionary,
} from 'unique-names-generator';

@Injectable()
export class SignInWorkflow {
  private logger: Logger = new Logger(SignInWorkflow.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly solanaSignInService: SolanaSignInService,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private jwtSign(user: DomainUser): string {
    const token = this.jwtService.sign(
      {
        ...user,
      },
      {
        secret: this.configService.getOrThrow('SERVICE_API_JWT_SECRET_KEY'),
        expiresIn: '1d',
      },
    );
    return token;
  }

  private generateTokenSet(user: DomainUser): {
    access_token: string;
    refresh_token: string;
  } {
    return {
      access_token: this.jwtSign(user),
      refresh_token: this.jwtSign(user),
    };
  }

  async generateSignInData() {
    return await this.solanaSignInService.generateSignInData();
  }

  async signUp(params: {
    input: SolanaSignInInput;
    output: SolanaSignInOutput;
  }): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    console.log('signUp', params);
    const address = params?.output?.account?.address;
    if (!address) throw new Error('wallet address is required');

    const numberDictionary = NumberDictionary.generate({
      min: 1000,
      max: 9999,
    });
    const words = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals, numberDictionary],
      separator: '-',
    });
    const username = words.toLowerCase();
    await this.userRepository.saveUser({
      address,
      username,
    });

    return this.generateTokenSet({
      address,
      username,
    });
  }

  async signIn(params: {
    input: SolanaSignInInput;
    output: SolanaSignInOutput;
  }): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    console.log('signIn', params);

    const address = params?.output?.account?.address;
    if (!address) throw new Error('wallet address is required');

    const user = await this.userRepository.findByAddress(address);

    if (!user) {
      return this.signUp(params);
    }

    return this.generateTokenSet({
      address: address,
      username: user.username,
    });
  }

  async refreshTokenSet(params: { address: string }): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    console.log('refresh', params);

    if (!params?.address) throw new Error('wallet address is required');

    const user = await this.userRepository.findByAddress(params.address);
    if (!user) throw new Error('user not found');

    return this.generateTokenSet({
      address: user.address,
      username: user.username,
    });
  }

  async getUserProfile(params: { address: string }): Promise<DomainUser> {
    console.log('getUserProfile', params);

    if (!params?.address) throw new Error('wallet address is required');

    const user = await this.userRepository.findByAddress(params.address);
    if (!user) throw new Error('user not found');

    return user;
  }
}
