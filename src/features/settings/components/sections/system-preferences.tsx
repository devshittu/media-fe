import React, { useState } from 'react';
import {
  SettingsField,
  SettingsFieldset,
  SettingsFieldsetFooter,
} from '../blocks/';
import ThemeSwitch from '@/components/theme-switch/theme-switch';
import { useForm } from 'react-hook-form';
import { SelectField } from '@/components';
import { Button } from '@/components/button';
import { useUpdateUserSettings } from '../../api/update-user-settings';
import {
  NotificationPosition,
  NotificationType,
  useNotifications,
} from '@/stores/notifications';
import { SystemSettingsData } from '../../types';
import { SettingsSectionProps } from '../types';
import { updateDeep } from '@/utils';

export const SystemPreferences = ({
  initialSettingValues,
}: SettingsSectionProps) => {
  const { showNotification } = useNotifications();
  const defaultSettings: SystemSettingsData = {
    theme: 'system',
    language: 'en',
  };

  const [localSettings, setLocalSettings] = useState<SystemSettingsData>(
    initialSettingValues?.system_settings || defaultSettings,
  );
  const onSuccess = () => {
    showNotification(
      {
        type: NotificationType.SUCCESS,
        title: 'Success',
        duration: 6000, // duration
        message: 'Settings updated!',
      },
      { position: NotificationPosition.BOTTOM_RIGHT },
    );
  };
  const updateSettings = useUpdateUserSettings({ onSuccess });
  const { register, handleSubmit, formState } = useForm<SystemSettingsData>({
    defaultValues: localSettings,
  });
  const onSubmit = (data: SystemSettingsData) => {
    console.log('data:', data);
    const updatedData = updateDeep(initialSettingValues, {
      system_settings: data,
    });
    updateSettings.submit(updatedData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

        <SettingsField
          id="language"
          title="Preferred Language"
          description="Make your choice of language."
        >
          <div className="w-1/3 md:block">
            <SelectField
              id="language"
              label="Language"
              options={[
                { value: '', label: 'Select Language' },
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
              ]}
              {...register('language', { required: 'Required' })}
              error={formState.errors['language']}
            />
          </div>
        </SettingsField>
        <SettingsFieldsetFooter>
          <Button
            loading={!!updateSettings.isLoading}
            disabled={updateSettings.isLoading}
            nativeType="submit"
            size="large"
            type="primary"
          >
            Update settings
          </Button>
        </SettingsFieldsetFooter>
      </SettingsFieldset>
    </form>
  );
};
