import { apiClient } from '@/lib/api-client';
import { AuthResponse } from '../types';
import { URI_AUTH_TOKEN_REFRESH } from '@/config/api-constants';

export const refreshToken = (): Promise<AuthResponse> => {
  return apiClient.post(`${URI_AUTH_TOKEN_REFRESH}`);
};

//Path: src/features/auth/api/refresh-token.ts
