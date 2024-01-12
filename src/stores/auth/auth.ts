import { createStore, useStore, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthUser } from '@/features/auth/types';
import { queryClient } from '@/lib/react-query';
import { getAuthUser } from '@/features/auth';
import { QUERY_KEYS } from '@/config/query';
import { handleTokenRefresh } from '@/utils';
const { AUTH_USER } = QUERY_KEYS;

type AuthStoreType = {
  accessToken: string | null;
  authUserDetails: AuthUser | null;
  setAccessToken: (token: string | null) => void;
  setAuthUserDetails: (userDetails: AuthUser | null) => void;
  initializeAuth: () => Promise<void>;
  clearAuth: () => void;
  isRefreshingToken: boolean;
  setIsRefreshingToken: (isRefreshing: boolean) => void;
};

// Explicitly type the state creator with Zustand's StateCreator type
const authStoreCreator: StateCreator<
  AuthStoreType,
  [['zustand/persist', unknown]]
> = (set, get) => ({
  accessToken: null,
  isRefreshingToken: false,
  authUserDetails: null,
  setAccessToken: (token) => set(() => ({ accessToken: token })),
  setAuthUserDetails: (userDetails: AuthUser | null) => {
    set({ authUserDetails: userDetails });
  },
  setIsRefreshingToken: (isRefreshing) => {
    set(() => ({ isRefreshingToken: isRefreshing }));
  },

  clearAuth: () => set(() => ({ accessToken: null, authUserDetails: null })),
  initializeAuth: async () => {
    // console.log(`authdebug: initializeAuth: begins`);
    const { accessToken, authUserDetails, clearAuth, isRefreshingToken } =
      get();
    if (!accessToken) {
      // No access token, so user is likely not logged in
      clearAuth();
      return;
    }
    if (accessToken && authUserDetails) {
      // console.log(`authdebug: initializeAuth: Token and user details are already in the store.`);
    } else {
      if (!accessToken && !isRefreshingToken) {
        await handleTokenRefresh();
      }

      // Fetch auth user information (only if not already stored)
      if (!authUserDetails) {
        await queryClient.fetchQuery([AUTH_USER], getAuthUser);
      }
    }

    // console.log(`authdebug: initializeAuth ends`);
  },
});

export const AuthStore = createStore(
  persist(authStoreCreator, {
    name: 'auth-store', // unique name for the persisted state
    storage: createJSONStorage(() => localStorage),
    version: 1.0, //
  }),
);

export const useAuthStore = () => useStore(AuthStore);

// Path: src/stores/auth/auth.ts
