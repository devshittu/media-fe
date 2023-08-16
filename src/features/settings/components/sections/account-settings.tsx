import React, { useState } from 'react';
import { SettingsField, SettingsFieldset } from '../blocks';
import { InputField } from '@/components';
import { AccountSettingsData, Setting } from '../../types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import { useUpdateUserSettings } from '../../api/update-user-settings';
import { updateDeep } from '@/utils';
type AccountSettingsProps = {
  initialSettingValues?: Setting;
  onSuccess?: () => void;
};
export const AccountSettings = ({
  initialSettingValues,
  onSuccess,
}: AccountSettingsProps) => {
  // if (!initialSettingValues) return;
  const defaultSettings: AccountSettingsData = { display_name: '', email: '' };

  const [localSettings, setLocalSettings] = useState<AccountSettingsData>(
    initialSettingValues?.account_settings || defaultSettings,
  );

  const updateSettings = useUpdateUserSettings({ onSuccess });
  const { register, handleSubmit, formState } = useForm<AccountSettingsData>({
    defaultValues: localSettings,
  });
  const onSubmit = (data: AccountSettingsData) => {
    console.log('data:', data);

    // if (!initialSettingValues) {
    //     console.error('initialSettingValues is not defined.');
    //     return;
    // }

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
          <Button
            loading={!!updateSettings.isLoading}
            disabled={updateSettings.isLoading}
            nativeType="submit"
            size="large"
            type="primary"
          >
            Update settings
          </Button>
        </SettingsFieldset>
      </form>
    </div>
  );
};

//Path src/features/settings/components/sections/account-settings.tsx
