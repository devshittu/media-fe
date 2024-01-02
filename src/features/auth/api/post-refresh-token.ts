import { apiClient } from '@/lib/api-client';
import { AuthResponse } from '../types';
import { URI_AUTH_TOKEN_REFRESH } from '@/config/api-constants';

export const refreshToken = async (): Promise<AuthResponse | null> => {
  try {
    return await apiClient.post(
      `${URI_AUTH_TOKEN_REFRESH}`,
      {},
      { withCredentials: true },
    );
  } catch (error) {
    console.error('Error refreshing access token refreshToken:', error);
    return null;
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await apiClient.post(
      `${URI_AUTH_TOKEN_REFRESH}`,
      {},
      {
        withCredentials: true,
      },
    );
    return response.data.accessToken || null;
  } catch (error) {
    console.error('Error refreshing access token refreshAccessToken:', error);
    return null;
  }
};
//Path: src/features/auth/api/refresh-token.ts
