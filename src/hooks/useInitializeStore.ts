import { useEffect } from 'react';
import {
  accountSettingsStore,
  defaultSettings,
  settingsCleanSheet,
} from '@/stores/app-settings/';
import { useBanner } from '@/stores/ui/banner';
import { DevelopmentBanner } from '@/components/blocks/banner/development-banner';

export const useInitializeStore = () => {
  const { show: showBanner } = useBanner();
  useEffect(() => {
    // Initialize the store with default settings
    accountSettingsStore.setState({
      defaultSettings,
      modifiedSettings: settingsCleanSheet,
    });
    showBanner(DevelopmentBanner);
    // const modifiedSettings = accountSettingsStore.getState().modifiedSettings;
    // console.log('useInitializeStore: modifiedSettings:// ', modifiedSettings);
  }, []);
};

// Path: media-fe/src/hooks/useInitializeStore.ts
