import {
  SolanaSignInInput,
  type SolanaSignInOutput,
} from '@solana/wallet-standard-features';

export interface SignInService {
  generateSignInData(): Promise<SolanaSignInInput>;
  verifySignInData(
    input: SolanaSignInInput,
    output: SolanaSignInOutput,
  ): boolean;
}

export const SignInService = Symbol('SignInService');
