import React, { useState } from 'react';
import {
  SettingsField,
  SettingsFieldset,
  SettingsFieldsetFooter,
} from '../blocks';
import { InputField, ToggleSwitch } from '@/components';
import { NotificationSettingsData, Setting } from '../../types';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/button';
import { SettingsSectionProps } from '../types';
import { useUpdateUserSettings } from '../../api/update-user-settings';
import {
  NotificationPosition,
  NotificationType,
  useNotifications,
} from '@/stores/notifications';
import { updateDeep } from '@/utils';

export const NotificationSettings = ({
  initialSettingValues,
}: // onSuccess,
SettingsSectionProps) => {
  const { showNotification } = useNotifications();
  const defaultSettings: NotificationSettingsData = {
    account: 1,
    marketing: 1,
    updates: 1,
  };

  const [localSettings, setLocalSettings] = useState<NotificationSettingsData>(
    initialSettingValues?.notification_settings.email || defaultSettings,
  );

  const onSuccess = () => {
    showNotification(
      {
        type: NotificationType.SUCCESS,
        title: 'Success',
        duration: 5000, // duration
        message: 'Settings updated!',
      },
      { position: NotificationPosition.BOTTOM_RIGHT },
    );
  };

  const updateSettings = useUpdateUserSettings({ onSuccess });
  const { register, handleSubmit, formState, control, watch } =
    useForm<NotificationSettingsData>({
      defaultValues: localSettings,
    });
  const onSubmit = (data: NotificationSettingsData) => {
    console.log('data:', data);
    const updatedData = updateDeep(initialSettingValues, {
      notification_settings: { email: data },
    });
    updateSettings.submit(updatedData);
  };
  const isAccountChecked = watch('account');
  const isMarketingChecked = watch('marketing');
  const isProductChecked = watch('updates');
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <SettingsFieldset
          id="Notifications"
          title="Notification"
          description="Choose which types of notifications you'd like to receive and how."
        >
          <SettingsField
            id="accountField"
            // fieldType="checkbox"
            title="Account notifications"
            description="Preferences for email notifications, including account-related, marketing, and update emails."
          >
            <Controller
              name="account"
              control={control}
              defaultValue={defaultSettings.account}
              render={({ field }) => (
                <ToggleSwitch
                  id="accountToggle"
                  leftLabel="Off"
                  rightLabel="On"
                  checked={field.value}
                  {...field}
                  onChange={(value) => field.onChange(value)} // This will pass 1 or 0 to the form
                />
              )}
            />

            <p>Toggle is {isAccountChecked ? 'ON' : 'OFF'}</p>
          </SettingsField>
          <SettingsField
            id="marketingField"
            // fieldType="checkbox"
            title="Marketting notification"
            description="Get a notification about marketting information"
          >
            <Controller
              name="marketing"
              control={control}
              defaultValue={defaultSettings.marketing}
              render={({ field }) => (
                <ToggleSwitch
                  id="marketingToggle"
                  leftLabel="Off"
                  rightLabel="On"
                  checked={field.value}
                  {...field}
                  onChange={(value) => field.onChange(value)} // This will pass 1 or 0 to the form
                />
              )}
            />

            <p>Toggle is {isMarketingChecked ? 'ON' : 'OFF'}</p>
          </SettingsField>
          <SettingsField
            id="updatesField"
            // fieldType="checkbox"
            title="Updates notifications"
            description="Get updates about our products and services..."
          >
            <Controller
              name="updates"
              control={control}
              defaultValue={defaultSettings.updates}
              render={({ field }) => (
                <ToggleSwitch
                  id="updatesToggle"
                  leftLabel="Off"
                  rightLabel="On"
                  checked={field.value}
                  {...field}
                  onChange={(value) => field.onChange(value)} // This will pass 1 or 0 to the form
                />
              )}
            />

            <p>Toggle is {isProductChecked ? 'ON' : 'OFF'}</p>
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
    </>
  );
};

//Path: src/features/settings/components/sections/notification-settings.tsx
