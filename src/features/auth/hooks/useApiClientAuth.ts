'use client';
import { apiClientAuth } from '@/lib/api-client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRefreshToken } from './useRefreshToken';
import { AuthStore } from '@/stores/auth';
import { handleTokenRefresh } from '@/utils';

const useApiClientAuth = () => {
  // const { data: session } = useSession();
  const { accessToken } = AuthStore.getState();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = apiClientAuth.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = apiClientAuth.interceptors.response.use(
      (response) => response?.data,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            await refreshToken();
            // await handleTokenRefresh(prevRequest)
            prevRequest.headers['Authorization'] = `Bearer ${
              AuthStore.getState().accessToken
            }`;
            return apiClientAuth(prevRequest);
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      apiClientAuth.interceptors.request.eject(requestIntercept);
      apiClientAuth.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refreshToken]);

  return apiClientAuth;
};

export default useApiClientAuth;

// Path: src/features/auth/hooks/useApiClientAuth.ts
