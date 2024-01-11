import { apiClient } from '@/lib/api-client';
import { AuthResponse } from '../types';
import { URI_AUTH_TOKEN_REFRESH } from '@/config/api-constants';

export const refreshToken = async (): Promise<AuthResponse | null> => {
  return await apiClient.post(
    `${URI_AUTH_TOKEN_REFRESH}`,
    {},
    { withCredentials: true },
  );
};

//Path: src/features/auth/api/post-refresh-token.ts
