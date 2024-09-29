'use client';
import React, { useState } from 'react';
import {
  SettingsField,
  SettingsFieldset,
  SettingsFieldsetFooter,
} from '../blocks';
import ThemeSwitch from '@/components/theme-switch/theme-switch';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { HookFormSelectField, SelectField } from '@/components';
import { Button } from '@/components/button';

import { Setting, SystemSettingsData } from '../../types';
import { SettingsSectionProps } from '../types';
import { useSuccessNotification } from '../../hooks';

import { useUpdateUserSettings } from '../../api/patch-update-user-settings';
import { updateDeep } from '@/utils';
import { SettingsFooter } from '../blocks/settings-footer';

export const SystemSettings = ({
  initialSettingValues,
}: SettingsSectionProps) => {
  const defaultSettings: SystemSettingsData = { theme: '', language: '' };

  const [localSettings, setLocalSettings] = useState<SystemSettingsData>(
    initialSettingValues?.system_settings || defaultSettings,
  );
  const { register, handleSubmit, formState, control } =
    useForm<SystemSettingsData>({
      defaultValues: localSettings,
    });

  const languageError: FieldError | undefined = formState.errors['language']
    ? {
        type: formState.errors['language'].type as string,
        message:
          typeof formState.errors['language'].message === 'string'
            ? formState.errors['language'].message
            : undefined,
      }
    : undefined;

  const showSuccess = useSuccessNotification('Settings updated!');
  const updateSettings = useUpdateUserSettings({ onSuccess: showSuccess });

  const onSubmit = (data: SystemSettingsData) => {
    console.log('data:', data);

    const newData = {
      system_settings: data,
    };
    updateSettings.submit(newData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <SettingsFieldset
        id="SystemSettings"
        title="System Settings"
        description=" Settings related to the system's appearance and language."
      >
        <SettingsField
          id="theme"
          title="Theme"
          description="Choose the visual theme for the interface."
        >
          <div className="w-1/3 md:block">
            <Controller
              name="theme"
              control={control as any}
              defaultValue={defaultSettings.theme}
              rules={{ required: 'Theme is required' }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <ThemeSwitch
                  onChange={onChange}
                  value={value}
                  error={error}
                  showLabel
                  className="items-start"
                />
              )}
            />
          </div>
        </SettingsField>

        <SettingsField
          id="language"
          title="Preferred Language"
          description="Select the language for the system's interface."
        >
          <div className="w-1/3 md:block">
            <HookFormSelectField
              name="language"
              control={control}
              id="language"
              label="Language"
              placeholder="Select Language"
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
              ]}
              rules={{ required: 'Required' }}
              error={formState.errors.language}
            />
          </div>
        </SettingsField>

        <SettingsFooter isLoading={formState.isSubmitting} />
      </SettingsFieldset>
    </form>
  );
};

//Path: src/features/settings/components/sections/system-preferences.tsx
