import React, { useState } from 'react';
import {
  SettingsField,
  SettingsFieldset,
  SettingsFieldsetFooter,
} from '../blocks';
import ThemeSwitch from '@/components/theme-switch/theme-switch';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { SelectField } from '@/components';
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
    const updatedData = updateDeep(initialSettingValues, {
      system_settings: data,
    });
    console.log('updatedData:', JSON.stringify(updatedData));
    // updateSettings.submit(updatedData);
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
            {/* <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <SelectField
                id="language"
                name='language'
                label="Language"
                placeholder="Select Language"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                ]}
                onChange={field.onChange}
                value={field.value}
                error={formState.errors.language}
              />
            )}
          /> */}
            <SelectField
              id="language"
              label="Language"
              placeholder="Select Language"
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
              ]}
              {...register('language', { required: 'Required' })}
              error={languageError}
            />
          </div>
        </SettingsField>

        <SettingsFooter isLoading={formState.isSubmitting} />
      </SettingsFieldset>
    </form>
  );
};

//Path: src/features/settings/components/sections/system-preferences.tsx

// export const SystemSettings = ({
//   initialSettingValues,
// }: SettingsSectionProps) => {
//   const { showNotification } = useNotifications();
//   const defaultSettings: SystemSettingsData = {
//     theme: '',
//     language: '',
//   };

//   const [localSettings, setLocalSettings] = useState<SystemSettingsData>(
//     initialSettingValues?.system_settings || defaultSettings,
//   );
//   const onSuccess = () => {
//     showNotification(
//       {
//         type: NotificationType.SUCCESS,
//         title: 'Success',
//         duration: 6000, // duration
//         message: 'Settings updated!',
//       },
//       { position: NotificationPosition.BOTTOM_RIGHT },
//     );
//   };
//   const updateSettings = useUpdateUserSettings({ onSuccess });
// const { register, handleSubmit, formState, control } = useForm<SystemSettingsData>({
//   defaultValues: localSettings,
// });
//   const onSubmit = (data: SystemSettingsData) => {
//     console.log('changed data:// ',data);
//     const updatedData = updateDeep(initialSettingValues, {
//       system_settings: data,
//     });
//     console.log('updatedData:// ', JSON.stringify(updatedData));
//     updateSettings.submit(updatedData);
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} noValidate>
//       <SettingsFieldset
//         id="SystemSettings"
//         title="System Settings"
//         description="See information about your account, download an archive of your data, or learn about your account deactivation options"
//       >
//         <SettingsField
//           id="theme"
//           title="Theme"
//           description="Set your theme according to your preference"
//         >
//           <div className="w-1/3 md:block">

//     <Controller
//       name="theme"
//       control={control}
//       defaultValue={localSettings.theme}
//       rules={{ required: 'Theme is required' }}
//       render={({ field: { onChange, value }, fieldState: { error } }) => (
//         <ThemeSwitch
//           onChange={onChange}
//           value={value}
//           error={error}
//           showLabel
//           className="items-start"
//         />
//       )}
//     />
//           </div>
//         </SettingsField>

//         <SettingsField
//           id="language"
//           title="Preferred Language"
//           description="Make your choice of language."
//         >
//           <div className="w-1/3 md:block">
//             <SelectField
//               id="language"
//               label="Language"
//               placeholder="Select Language"
//               options={[
//                 // { value: '', label: 'Select Language' },
//                 { value: 'en', label: 'English' },
//                 { value: 'es', label: 'Spanish' },
//               ]}
//               {...register('language', { required: 'Required' })}
//               error={formState.errors['language']}
//             />
//           </div>
//         </SettingsField>
//         <SettingsFieldsetFooter>
//           <Button
//             loading={!!updateSettings.isLoading}
//             disabled={updateSettings.isLoading}
//             nativeType="submit"
//             size="large"
//             type="primary"
//           >
//             Update settings
//           </Button>
//         </SettingsFieldsetFooter>
//       </SettingsFieldset>
//     </form>
//   );
// };
