export interface AuthService {
  generateAccessToken(payload: { username: string; address: string }): {
    token: string;
    refresh: string;
  };
}

export const AuthService = Symbol('AuthService');
