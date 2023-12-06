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
import { AccountSettingsData, UpdateUserProfileData } from '../../types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import { SettingsSectionProps } from '../types';
import { useUpdateUserProfile } from '../../api/put-update-user-profile-info';

export const AccountSettings = ({
  initialSettingValues,
}: SettingsSectionProps) => {
  const { showNotification } = useNotifications();
  const defaultSettings: AccountSettingsData = {
    display_name: '',
    email: '',
    username: '',
  };

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

  // const updateSettings = useUpdateUserSettings({ onSuccess });
  const updateSettings = useUpdateUserProfile({ onSuccess });
  const { register, handleSubmit, formState } = useForm<UpdateUserProfileData>({
    defaultValues: localSettings,
  });
  const onSubmit = (data: UpdateUserProfileData) => {
    console.log('data:', data);
    // const updatedData = updateDeep(initialSettingValues, {
    //   account_settings: data,
    // });
    console.log('updatedData:', JSON.stringify(data));
    updateSettings.submit(data);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Display Name

Title: "Public Profile Name"
Description: "Your visible name to other users; choose something memorable."
Username

Title: "Unique Username"
Description: "A distinct identifier for sign-in and profile reference."
Email

Title: "Email Address"
Description: "Used for account security and essential notifications."
 */}
          <SettingsFieldset
            id="AccountDetailsSettings"
            title="Account Settings"
            description="Personal details and contact information associated with the user's account."
          >
            <SettingsField
              id="account_email"
              title="Account email"
              description="Used for account security and essential notifications."
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
              title="Display Name"
              description="Your visible name to other users; choose something memorable."
            >
              <InputField
                label="Display name"
                type="text"
                {...register('display_name', { required: 'Required' })}
                error={formState.errors['display_name']}
              />
            </SettingsField>

            <SettingsField
              id="account_username"
              title="Username"
              description="A distinct identifier for sign-in and profile reference."
            >
              <InputField
                label="username"
                type="text"
                {...register('username', { required: 'Required' })}
                error={formState.errors['username']}
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
                Update account information
              </Button>
            </SettingsFieldsetFooter>
          </SettingsFieldset>
        </form>
      </div>
    </>
  );
};

//Path src/features/settings/components/sections/account-settings.tsx
