// useInitializeStore.ts
import { useEffect } from 'react';
import {
  accountSettingsStore,
  defaultSettings,
  settingsCleanSheet,
} from '@/stores/app-settings/';

export const useInitializeStore = () => {
  useEffect(() => {
    // Initialize the store with default settings
    accountSettingsStore.setState({
      defaultSettings,
      modifiedSettings: settingsCleanSheet,
    });
    // const modifiedSettings = accountSettingsStore.getState().modifiedSettings;
    // console.log('useInitializeStore: modifiedSettings:// ', modifiedSettings);
  }, []);
};
