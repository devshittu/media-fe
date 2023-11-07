import { createStore, useStore } from 'zustand';
import { AuthUser } from '@/features/auth/types';
import { getItem, setItem, removeItem } from '@/utils/localStorage';
import { refreshToken } from '@/features/auth/api/post-refresh-token';
import { queryClient } from '@/lib/react-query';
import { getAuthUser } from '@/features/auth';
import {
  setStoredToken,
  getStoredToken,
  setStoredUserDetails,
  getStoredUserDetails,
} from '@/utils/auth';

export type authStore = {
  accessToken: string | null;
  authUserDetails: AuthUser | null;
  setAccessToken: (token: string | null) => void;
  setAuthUserDetails: (userDetails: AuthUser | null) => void;
  initializeAuth: () => void;
};

export const AuthStore = createStore<authStore>((set) => ({
  accessToken: null,
  authUserDetails: null,
  setAccessToken: (token) => {
    set({ accessToken: token });
    if (token) {
      setItem('accessToken', token);
    } else {
      removeItem('accessToken');
    }
  },
  setAuthUserDetails: (userDetails) => {
    set({ authUserDetails: userDetails });
    if (userDetails) {
      setItem('authUserDetails', userDetails);
    } else {
      removeItem('authUserDetails');
    }
  },

  initializeAuth: async () => {
    const storedToken = getStoredToken();
    const storedAuthUserDetails = getStoredUserDetails();
    if (storedToken && storedAuthUserDetails) {
      console.log(
        'storedToken and storedAuthUserDetails is here before fetching from server:',
        storedToken,
      );
      set({ accessToken: storedToken, authUserDetails: storedAuthUserDetails });
    } else {
      try {
        const response = await refreshToken();
        const newAccessToken = response.access_token;
        setStoredToken(newAccessToken);
        set({ accessToken: newAccessToken });

        // Fetch auth user information (only if not already stored)
        if (!storedAuthUserDetails) {
          const authUserData = await queryClient.fetchQuery(
            ['auth-user'],
            getAuthUser,
          );
          console.log('fetching from server authUserData', authUserData);
          setStoredUserDetails(authUserData);
          set({ authUserDetails: authUserData });
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }
  },
}));

export const useAuth = () => useStore(AuthStore);

//Path: src/stores/auth/auth.ts
