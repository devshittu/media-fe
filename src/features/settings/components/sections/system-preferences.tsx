import React from 'react';
import { SettingsField, SettingsFieldset } from '../blocks/';
import ThemeSwitch from '@/components/theme-switch/theme-switch';

export const SystemPreferences = () => {
  return (
    <SettingsFieldset
      id="SystemSettings"
      title="System Settings"
      description="See information about your account, download an archive of your data, or learn about your account deactivation options"
    >
      <SettingsField
        id="theme"
        title="Theme"
        description="Set your theme according to your preference"
      >
        <div className="w-1/3 md:block">
          <ThemeSwitch showLabel className="items-start" />
        </div>
      </SettingsField>
    </SettingsFieldset>
  );
};
