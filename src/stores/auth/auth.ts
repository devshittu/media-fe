import { createStore, useStore } from 'zustand';
import Router from 'next/router';
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
    console.log('authdebug: start setting the ACCESS_TOKEN_KEY: ', token);
    set({ [ACCESS_TOKEN_KEY]: token });
    if (token) {
      setItem(ACCESS_TOKEN_KEY, token);
    } else {
      removeItem(ACCESS_TOKEN_KEY);
    }
  },
  setAuthUserDetails: (userDetails) => {
    console.log(
      'authdebug: start setting the AUTH_USER_DETAILS_KEY: ',
      userDetails,
    );
    set({ [AUTH_USER_DETAILS_KEY]: userDetails });
    if (userDetails) {
      setItem(AUTH_USER_DETAILS_KEY, userDetails);
    } else {
      removeItem(AUTH_USER_DETAILS_KEY);
    }
  },

  initializeAuth: async () => {
    console.log(`authdebug: initializeAuth: begins`);
    const storedToken = getItem<string>(ACCESS_TOKEN_KEY);
    const storedAuthUserDetails = getItem<AuthUser>(AUTH_USER_DETAILS_KEY);
    if (storedToken && storedAuthUserDetails) {
      console.log(
        `authdebug: initializeAuth: storedToken:${storedToken} and storedAuthUserDetails.display_name: ${JSON.stringify(
          storedAuthUserDetails.display_name,
        )} is here before fetching from server:`,
      );
      set({ [ACCESS_TOKEN_KEY]: storedToken });
      set({ [AUTH_USER_DETAILS_KEY]: storedAuthUserDetails });
    } else {
      console.log('authdebug: initializeAuth: doing await refreshToken');
      try {
        const response = await refreshToken();
        const newAccessToken = response.access_token;
        console.log(
          `authdebug: initializeAuth: set new Token(newAccessToken) ${newAccessToken} is stored`,
        );

        set({ [ACCESS_TOKEN_KEY]: newAccessToken });
        setItem(ACCESS_TOKEN_KEY, newAccessToken);
        // get().setAccessToken(storedToken);

        // Fetch auth user information (only if not already stored)
        if (!storedAuthUserDetails) {
          const authUserData = await queryClient.fetchQuery(
            ['auth-user'],
            getAuthUser,
          );
          console.log(
            'authdebug: initializeAuth: fetching from server authUserData',
            authUserData,
          );

          set({ [AUTH_USER_DETAILS_KEY]: authUserData });
          setItem(AUTH_USER_DETAILS_KEY, authUserData);
        }
      } catch (error) {
        console.error(
          `authdebug: initializeAuth: Failed to refresh token:`,
          error,
        );
        get().setAccessToken(null);
        get().setAuthUserDetails(null);
        // Show notification that Cannot login.

        Router.push('/');
      }
    }

    console.log(`authdebug: initializeAuth ends`);
  },
}));

export const useAuth = () => useStore(AuthStore);

//Path: src/stores/auth/auth.ts
