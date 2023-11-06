import { SignupData } from '@/features/auth';
import {
  PersonalSettingsData,
  Setting,
  SystemSettingsData,
} from '@/features/settings';
import { createStore, useStore } from 'zustand';

export type signupStore = {
  basicInformation: SignupData | null;
  otp: string | null;
  theme: SystemSettingsData['theme'] | null;
  favoriteCategories: PersonalSettingsData['favorite_categories'] | null;
  setBasicInformation: (data: SignupData | null) => void;
  setOTP: (data: string | null) => void;
  setFavoriteCategories: (
    data: PersonalSettingsData['favorite_categories'] | null,
  ) => void;
  setTheme: (data: SystemSettingsData['theme'] | null) => void;
  // setSignupData: (data: Partial<signupStore>) => void;
  getSignupData: () => Partial<Setting>;
};

export const SignupDataStore = createStore<signupStore>((set, get) => ({
  basicInformation: null,
  otp: null,
  theme: null,
  favoriteCategories: null,
  setBasicInformation: (basicInfo) => set({ basicInformation: basicInfo }),
  setOTP: (otp) => set({ otp: otp }),
  setFavoriteCategories: (categories) =>
    set({ favoriteCategories: categories }),
  setTheme: (theme) => set({ theme: theme }),
  // setSignupData: (data) => set((state) => ({ ...state, ...data })),

  getSignupData: () => {
    return {
      // id: "some_generated_id",
      // user_id: "some_user_id",
      system_settings: {
        theme: get().theme || 'system',
        language: 'en',
      },
      account_settings: {
        display_name: get().basicInformation?.username || '',
        email: get().basicInformation?.email || '',
      },
      notification_settings: {
        email: {
          account: 1, //TODO: get the default information
          marketing: 1,
          updates: 1,
        },
      },
      personal_settings: {
        favorite_categories: get().favoriteCategories || [],
      },
      // last_updated: Date.now(),
      // created_at: Date.now(),
      // updated_at: Date.now(),
    };
  },
}));

export const useSignupStore = () => useStore(SignupDataStore);

//Path: src/stores/auth/signup.ts
