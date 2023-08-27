import { Setting } from '@/features/settings';
import { createAppSettingsStore } from '../app-settings';
import { useStore } from 'zustand';

export const defaultSettings = {
  id: '1',
  user_id: '1',
  system_settings: { theme: 'system', language: 'en' },
  account_settings: {
    display_name: 'testuser1',
    email: 'user1@test.com',
  },
  notification_settings: {
    email: {
      account: 1,
      marketing: 1,
      updates: 1,
    },
  },
  personal_settings: {
    favorite_categories: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
    ],
  },
  last_updated: 1690123521,
  created_at: 1690123521,
  updated_at: 1690123521,
};
export const settingsCleanSheet = {
  ...defaultSettings,
  personal_settings: {
    favorite_categories: [],
  },
};

export const accountSettingsStore = createAppSettingsStore<Setting>();

export const useAccountSettingsStore = () => useStore(accountSettingsStore);

// Path: src/stores/wizard/useAccountSettingsStore.ts
