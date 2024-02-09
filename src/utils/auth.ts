import { AuthStore } from '@/stores/auth';
import { apiClient } from '@/lib/api-client';
import Router from 'next/router';
import {
  URI_AUTH_LOGOUT,
  URI_AUTH_TOKEN_REFRESH,
} from '@/config/api-constants';
import { refreshToken } from '@/features/auth/api/post-refresh-token';
import {
  DEFAULT_ACCESS_TOKEN_KEY_EXPIRES_AT,
  DEFAULT_BUFFER_START_PERCENTAGE,
} from '@/config/constants';

export const signOut = async (): Promise<void> => {
  const { accessToken, clearAuth } = AuthStore.getState();

  if (!accessToken) {
    clearAuth();
    Router.push('/auth/signin');
    return;
  }

  try {
    await apiClient.post(
      URI_AUTH_LOGOUT,
      {},
      { withCredentials: true, requiresAuth: true },
    );
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

  console.log('authdebug: token refresh begins');

  setIsRefreshingToken(true);
  try {
    const response = await refreshToken();
    console.log(`authdebug: refreshToken`, response);
    const newAccessToken = response?.access_token;
    const newAccessTokenExpiry = response?.access_token_expires_at;

    if (newAccessToken) {
      setAccessToken(
        newAccessToken,
        newAccessTokenExpiry || DEFAULT_ACCESS_TOKEN_KEY_EXPIRES_AT,
      );
      console.log(`authdebug: token refresh response:`, response);
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

export const calculateBufferStatus = (
  expiresAt: number,
  bufferPercentage: number = DEFAULT_BUFFER_START_PERCENTAGE,
): { withinBuffer: boolean; timeUntilBuffer: number } => {
  const now = Date.now(); // Current time in milliseconds
  // Ensure expiresAt is treated as a number. If it's a string, this conversion is crucial.
  const expiryTime = Number(expiresAt) * 1000; // Convert expiresAt to milliseconds
  const totalTime = expiryTime - now;
  const bufferTime = totalTime * (bufferPercentage / 100);
  const withinBuffer = now + bufferTime >= expiryTime;
  const timeUntilBuffer = Math.max(0, expiryTime - bufferTime - now);

  // Debugging: Log the calculated values
  console.log(
    `Debug: expiresAt=${expiresAt}, expiryTime=${expiryTime}, totalTime=${totalTime}, bufferTime=${bufferTime}, now=${now}, withinBuffer=${withinBuffer}, timeUntilBuffer=${timeUntilBuffer}`,
  );

  return { withinBuffer, timeUntilBuffer };
};

//Path: utils/auth.ts
