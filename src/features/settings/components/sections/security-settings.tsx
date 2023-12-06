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
import { AccountSettingsData, UpdatePasswordData } from '../../types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';
import { useUpdateUserSettings } from '../../api/patch-update-user-settings';
import { updateDeep } from '@/utils';
import { SettingsSectionProps } from '../types';
import { useUpdateUserPassword } from '../../api/put-update-user-password';
import { Space } from '@/components/labs';

export const SecuritySettings = ({
  initialSettingValues,
}: SettingsSectionProps) => {
  // if (!initialSettingValues) return;
  const { showNotification } = useNotifications();

  const defaultPasswordSettings: UpdatePasswordData = {
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  };

  const [localSettings, setLocalSettings] = useState<UpdatePasswordData>(
    defaultPasswordSettings,
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

  const updateUserPassword = useUpdateUserPassword({ onSuccess });
  // const updateSettings = useUpdateUserSettings({ onSuccess });
  const { register, handleSubmit, formState } = useForm<UpdatePasswordData>({
    defaultValues: localSettings,
  });
  const onSubmit = (data: UpdatePasswordData) => {
    console.log('data:', data);
    // const updatedData = updateDeep(initialSettingValues, {
    //   account_settings: data,
    // });
    // console.log('updatedData:', JSON.stringify(updatedData));
    updateUserPassword.submit(data);
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <SettingsFieldset
            id="PasswordSettings"
            title="Password Settings"
            description="Personal details and contact information associated with the user's account."
          >
            <SettingsField
              id="old_password"
              title="Enter old password"
              description="The email address associated with your account."
            >
              <InputField
                label="old_password"
                type="text"
                {...register('old_password', { required: 'Required' })}
                error={formState.errors['old_password']}
              />
            </SettingsField>
            <SettingsField
              id="new_password"
              title="Enter your new password"
              description="The email address associated with your account."
            >
              <InputField
                label="New password"
                showLabel
                type="text"
                {...register('new_password', { required: 'Required' })}
                error={formState.errors['new_password']}
              />
              <Space />
              <InputField
                label="Confirm new password"
                showLabel
                type="text"
                {...register('confirm_new_password', { required: 'Required' })}
                error={formState.errors['confirm_new_password']}
              />
            </SettingsField>

            <SettingsFieldsetFooter>
              <Button
                loading={!!updateUserPassword.isLoading}
                disabled={updateUserPassword.isLoading}
                nativeType="submit"
                size="large"
                type="primary"
              >
                Change Password
              </Button>
            </SettingsFieldsetFooter>
          </SettingsFieldset>
        </form>
      </div>
    </>
  );
};

//Path src/features/settings/components/sections/account-settings.tsx
