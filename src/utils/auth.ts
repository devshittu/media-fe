import { AuthStore } from '@/stores/auth';
import { apiClient } from '@/lib/api-client';
import Router from 'next/router';
import {
  URI_AUTH_LOGOUT,
  URI_AUTH_TOKEN_REFRESH,
} from '@/config/api-constants';
import { refreshToken } from '@/features/auth/api/post-refresh-token';

export const signOut = async (): Promise<void> => {
  const { accessToken, clearAuth } = AuthStore.getState();

  if (!accessToken) {
    clearAuth();
    Router.push('/auth/signin');
    return;
  }

  try {
    await apiClient.post(URI_AUTH_LOGOUT, {}, { withCredentials: true });
  } catch (error) {
    console.error('Error during signout:', error);
  } finally {
    clearAuth();
    Router.push('/auth/signin');
  }
};

export const handleLogoutAndRedirect = async () => {
  await signOut();
};

export const handleTokenRefresh = async (
  originalRequest?: any,
): Promise<void> => {
  const { isRefreshingToken, setIsRefreshingToken, setAccessToken, clearAuth } =
    AuthStore.getState();

  if (isRefreshingToken) {
    return;
  }

  setIsRefreshingToken(true);
  try {
    const response = await refreshToken();
    const newAccessToken = response?.access_token;

    if (newAccessToken) {
      setAccessToken(newAccessToken);
      if (originalRequest) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      }
    } else {
      throw new Error('No new access token received');
    }
  } catch (error) {
    console.error('Error while refreshing token:', error);
    clearAuth();
    // Delayed navigation to avoid interrupting the finally block
    // setTimeout(() => Router.push('/auth/signin'), 0);
    throw error;
  } finally {
    setIsRefreshingToken(false);
  }
};

//Path: utils/auth.ts
