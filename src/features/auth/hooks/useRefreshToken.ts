'use client';

import { URI_AUTH_TOKEN_REFRESH } from '@/config/api-constants';
import { apiClient, apiClientAuth, refresherApiClient } from '@/lib/api-client';
import { AuthStore } from '@/stores/auth';

export const useRefreshToken = () => {
  //   const { data: session } = useSession();
  const { accessToken, setAccessToken } = AuthStore.getState();

  const refreshToken = async () => {
    const res = await refresherApiClient.post(
      `${URI_AUTH_TOKEN_REFRESH}`,
      {},
      { withCredentials: true },
    );

    console.log('authdebug: useRefreshToken:// ', res);

    const newAccessToken = res.data.access_token;

    console.log(
      'authdebug: useRefreshToken/newAccessToken:// ',
      newAccessToken,
    );

    setAccessToken(newAccessToken);

    // Update the session with the new access token
    // await signIn('credentials', {
    //   accessToken: newAccessToken,
    //   callbackUrl: '/no-redirect',
    // });

    // if (session) session.user.accessToken = res.data.access_token;
    // else signIn();
  };
  return refreshToken;
};

// Path: src/features/auth/hooks/useRefreshToken.ts
