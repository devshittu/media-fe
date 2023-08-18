import React, { useState } from 'react';
import {
  SettingsField,
  SettingsFieldset,
  SettingsFieldsetFooter,
} from '../blocks';
import { InputField } from '@/components';
import {
  useNotifications,
  NotificationType,
  NotificationPosition,
} from '@/stores/notifications';
import { AccountSettingsData, Setting } from '../../types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import { useUpdateUserSettings } from '../../api/update-user-settings';
import { updateDeep } from '@/utils';
import { SettingsSectionProps } from '../types';

export const AccountSettings = ({
  initialSettingValues,
}: // onSuccess,
SettingsSectionProps) => {
  // if (!initialSettingValues) return;
  const { showNotification } = useNotifications();
  const defaultSettings: AccountSettingsData = { display_name: '', email: '' };

  const [localSettings, setLocalSettings] = useState<AccountSettingsData>(
    initialSettingValues?.account_settings || defaultSettings,
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
  const { register, handleSubmit, formState } = useForm<AccountSettingsData>({
    defaultValues: localSettings,
  });
  const onSubmit = (data: AccountSettingsData) => {
    console.log('data:', data);
    const updatedData = updateDeep(initialSettingValues, {
      account_settings: data,
    });
    updateSettings.submit(updatedData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <SettingsFieldset
          id="AccountDetailsSettings"
          title="Account Settings"
          description="Set your display name, change your account email and secure your account change passwords."
        >
          <SettingsField
            id="account_email"
            title="Change your account email"
            description="When you change your account, your email will reflect after a period of 24 hours."
          >
            <InputField
              label="Email"
              type="email"
              {...register('email', { required: 'Required' })}
              error={formState.errors['email']}
            />
          </SettingsField>
          <SettingsField
            id="account_display_name"
            title="Change your display name"
            description="When you change your account, your email will reflect after a period of 24 hours."
          >
            <InputField
              label="Display name"
              type="text"
              {...register('display_name', { required: 'Required' })}
              error={formState.errors['display_name']}
            />
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
    </div>
  );
};

//Path src/features/settings/components/sections/account-settings.tsx
