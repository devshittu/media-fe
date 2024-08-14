import { AuthUser } from '@/features/auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  type User = AuthUser & {
    accessToken: string;
    refreshToken: string;
    idToken: string;
    exp: number;
    role: string;
  };
  AuthUser

  type Session = {
    user: User & DefaultSession['user'];
    expires: string;
    error: string;
  };
}
