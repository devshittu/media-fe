import { createStore, useStore } from 'zustand';

export type signupStore = {
  email: string | null;
  username: string | null;
  password: string | null;
  name: string | null;
  setSignupData: (data: Partial<signupStore>) => void;
};

export const SignupDataStore = createStore<signupStore>((set) => ({
  email: null,
  username: null,
  password: null,
  name: null,
  setSignupData: (data) => set((state) => ({ ...state, ...data })),
}));

export const useSignupStore = () => useStore(SignupDataStore);

//Path: src/stores/auth/signup.ts
