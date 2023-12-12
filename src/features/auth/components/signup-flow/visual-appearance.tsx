import { useWizardStepValidation } from '@/components/blocks/wizard/hooks';
import { useStepCompletion } from '@/components/blocks/wizard/hooks/useStepCompletion';
import { StepProps } from '@/components/blocks/wizard/types';
import { Button } from '@/components/button';
import { ThemeSelection } from '@/components/form/theme-selection';
import {
  Icon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from '@/components/illustrations';
import { useThemeChanger } from '@/components/theme-switch/hooks';
import { UpdateSettingsButton } from '@/features/settings';
import { useUpdateUserSettings } from '@/features/settings/api/patch-update-user-settings';
import { useSuccessNotification } from '@/features/settings/hooks';
import { useAccountSettingsStore } from '@/stores/app-settings';
import { useSignupStore } from '@/stores/auth';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const VisualAppearance = ({ onValidationStatusChange }: StepProps) => {
  const asyncOnCompleted = useCallback(async () => {
    // Perform any asynchronous operations here
    console.log('Component task is completed.');
  }, []);
  const [isCompleted, setIsCompleted] = useStepCompletion({
    // trigger: true,
    onCompleted: asyncOnCompleted,
    initialValue: false,
  });

  // Initialize React Hook Form
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      theme: 'system', // default value
    },
  });

  useWizardStepValidation(() => isCompleted);

  const showSuccess = useSuccessNotification(
    'Your preferred theme settings updated!',
  );
  const onSuccess = () => {
    showSuccess();
    setIsCompleted(true);
  };

  const updateSettings = useUpdateUserSettings({ onSuccess });
  // Access store methods.
  const { setTheme } = useSignupStore();
  // Function to perform server synchronization
  const serverSync = async (theme: string) => {
    // Perform the server sync logic here

    updateModifiedSettings(['system_settings', 'theme'], theme);
    console.log('About to submit this to the server', modifiedSettings);
    // Update the signup store
    setTheme(theme);
    updateSettings.submit(modifiedSettings);
    console.log('Perform the server sync logic here');
  };

  const { handleThemeChange } = useThemeChanger({
    onChange: (theme) => {
      // Handle the theme change here if needed
      console.log('Changed theme to ', theme);
    },
    onServerSync: serverSync, // Pass the server sync function
  });

  const themeOptions = [
    {
      id: 'light',
      label: 'Light',
      description: 'A bright and clear theme for daytime use.',
      svg: (
        <SunIcon className="text-amber-500 dark:text-amber-300 mb-2 w-7 h-7" />
      ),
    },
    {
      id: 'system',
      label: 'System',
      description: 'Automatically adapts to your system settings.',
      svg: (
        <MonitorIcon className="text-slate-800 dark:text-slate-200  mb-2 w-7 h-7" />
      ),
    },
    {
      id: 'dark',
      label: 'Dark',
      description: 'A dark theme to reduce eye strain in low light.',
      svg: <MoonIcon className="text-sky-500  mb-2 w-7 h-7" />,
    },
  ];
  // Function to set value and mark the form as validated.
  const handleValidSelection = (option: any) => {
    handleThemeChange(option.id as any);
    setValue('theme', option.id, { shouldValidate: true });
  };

  const { modifiedSettings, updateModifiedSettings } =
    useAccountSettingsStore();
  const onSubmit = async (data: any) => {
    // updateModifiedSettings(
    //   ['system_settings', 'theme'],
    //   data['theme'],
    // );
    // updateSettings.submit(modifiedSettings);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <Controller
          name="theme"
          control={control}
          rules={{ required: 'Theme is required' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <ThemeSelection
              options={themeOptions}
              selectedTheme={value}
              onSelect={(option) => {
                onChange(option.id);
                handleValidSelection(option);
              }}
              errorMessage={error ? error.message : null}
            />
          )}
        />
        <div className="flex items-center min-h-[3rem]"> </div>
        {/* <UpdateSettingsButton isLoading={updateSettings.isLoading} /> */}
      </form>
    </div>
  );
};

//Path: src/features/auth/components/signup-flow/visual-appearance.tsx
