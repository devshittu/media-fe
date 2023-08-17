import React from 'react';
import { SettingsField, SettingsFieldset } from '../blocks';
import { InputField } from '@/components';
import { Setting } from '../../types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/button';

export const NotificationSettings = () => {
  // const login = useLogin({ onSuccess });
  let login = { submit: (d: any) => login };
  const { register, handleSubmit, formState } = useForm<Setting>();
  const onSubmit = (data: Setting) => {
    console.log(data);
    login.submit(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <SettingsFieldset
          id="Notifications"
          title="Notification"
          description="Select the kinds of notifications you get about your activities, interests, and recommendations."
        >
          <SettingsField
            id="myField"
            fieldType="checkbox"
            title="Who haven’t confirmed their phone number"
            description="See information about your account, download an archive of your data, or learn about your account deactivation options"
          >
            <InputField
              label="Email"
              type="email"
              {...register('email', { required: 'Required' })}
              error={formState.errors['email']}
            />
          </SettingsField>
          <SettingsField
            id="myField2"
            fieldType="text"
            fieldName="info"
            fieldPlaceholder="Enter your email"
            title="Account Email"
            description="See information about your account, download an archive of your data, or learn about your account deactivation options"
          />
          <SettingsField
            id="myField3"
            fieldType="textarea"
            fieldPlaceholder="Enter your long text here..."
            title="Who haven’t confirmed their phone number"
            description="See information about your account, download an archive of your data, or learn about your account deactivation options"
          ></SettingsField>
        </SettingsFieldset>
        <Button
          loading={!!login.isLoading}
          disabled={login.isLoading}
          nativeType="submit"
        >
          Log in
        </Button>
      </form>
    </>
  );
};
