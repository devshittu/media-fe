'use client';
import React, { useState } from 'react';
import {
  SettingsField,
  SettingsFieldset,
  SettingsFieldsetFooter,
} from '../blocks';
import { HookFormInputField } from '@/components';
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
  const { register, handleSubmit, formState, control } =
    useForm<UpdateUserProfileData>({
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
              <HookFormInputField
                name="email"
                control={control}
                placeholder="Enter your email to continue..."
                id="email"
                label="Email"
                type="email"
                showLabel
                rules={{
                  required: 'Your email is required to continue',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address',
                  },
                }}
                error={formState.errors.email}
              />
            </SettingsField>
            <SettingsField
              id="account_display_name"
              title="Display Name"
              description="Your visible name to other users; choose something memorable."
            >

              <HookFormInputField
                name="display_name"
                control={control}
                placeholder="Enter your name"
                id="name"
                label="Your name"
                type="text"
                showLabel
                rules={{
                  required: 'Your name is required to continue',
                  pattern: {
                    value: /^[\p{L}\p{N}\p{Z}\p{Pd}'’]+$/u,
                    message: 'Invalid name format',
                  },
                }}
                error={formState.errors.display_name}
              />
            </SettingsField>

            <SettingsField
              id="account_username"
              title="Username"
              description="A distinct identifier for sign-in and profile reference."
            >

              <HookFormInputField
                name="username"
                control={control}
                placeholder="Enter your username"
                id="username"
                label="Username"
                type="text"
                showLabel
                rules={{
                  required: 'Your username is required to continue',
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      'Username can only contain letters, numbers, and underscores',
                  },
                }}
                error={formState.errors.username}
              />
            </SettingsField>

            <SettingsFieldsetFooter>
              <Button
                id={`update-settings-button`}
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
