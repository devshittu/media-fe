import { createStore, useStore } from 'zustand';

export type authStore = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

export const AuthStore = createStore<authStore>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}));

export const useAuth = () => useStore(AuthStore);

//Path: src/stores/auth/auth.ts
