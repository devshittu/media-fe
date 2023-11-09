import { createStore, useStore } from 'zustand';
import { AuthUser } from '@/features/auth/types';
import { getItem, setItem, removeItem } from '@/utils/localStorage';
import { refreshToken } from '@/features/auth/api/post-refresh-token';
import { queryClient } from '@/lib/react-query';
import { getAuthUser } from '@/features/auth';
import { ACCESS_TOKEN_KEY, AUTH_USER_DETAILS_KEY } from '@/config/constants';

export type authStore = {
  accessToken: string | null;
  authUserDetails: AuthUser | null;
  setAccessToken: (token: string | null) => void;
  setAuthUserDetails: (userDetails: AuthUser | null) => void;
  initializeAuth: () => void;
};

export const AuthStore = createStore<authStore>((set, get) => ({
  [ACCESS_TOKEN_KEY]: null,
  [AUTH_USER_DETAILS_KEY]: null,
  setAccessToken: (token) => {
    set({ [ACCESS_TOKEN_KEY]: token });
    if (token) {
      setItem(ACCESS_TOKEN_KEY, token);
    } else {
      removeItem(ACCESS_TOKEN_KEY);
    }
  },
  setAuthUserDetails: (userDetails) => {
    set({ [AUTH_USER_DETAILS_KEY]: userDetails });
    if (userDetails) {
      setItem(AUTH_USER_DETAILS_KEY, userDetails);
    } else {
      removeItem(AUTH_USER_DETAILS_KEY);
    }
  },

  initializeAuth: async () => {
    console.log(`authdebug: initializeAuth begins`);
    const storedToken = getItem<string>(ACCESS_TOKEN_KEY);
    const storedAuthUserDetails = getItem<AuthUser>(AUTH_USER_DETAILS_KEY);
    if (storedToken && storedAuthUserDetails) {
      console.log(
        `authdebug: storedToken:${storedToken} and storedAuthUserDetails: ${JSON.stringify(
          storedAuthUserDetails,
        )} is here before fetching from server:`,
      );
      get().setAccessToken(storedToken);
      get().setAuthUserDetails(storedAuthUserDetails);
    } else {
      console.log('authdebug: doing await refreshToken');
      try {
        const response = await refreshToken();
        const newAccessToken = response.access_token;
        console.log(
          `authdebug: set new Token(newAccessToken) ${newAccessToken} is stored`,
        );

        get().setAccessToken(storedToken);

        // Fetch auth user information (only if not already stored)
        if (!storedAuthUserDetails) {
          const authUserData = await queryClient.fetchQuery(
            ['auth-user'],
            getAuthUser,
          );
          console.log(
            'authdebug: fetching from server authUserData',
            authUserData,
          );
          get().setAuthUserDetails(storedAuthUserDetails);
        }
      } catch (error) {
        console.error(`authdebug: Failed to refresh token:`, error);
        get().setAccessToken(null);
        get().setAuthUserDetails(null);
      }
    }

    console.log(`authdebug: initializeAuth ends`);
  },
}));

export const useAuth = () => useStore(AuthStore);

//Path: src/stores/auth/auth.ts
