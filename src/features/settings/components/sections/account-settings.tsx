import React from 'react';
import { SettingsFieldset } from '../settings-fieldset';
import { SettingsField } from '../settings-field';

export const AccountSettings = () => {
  return (
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
      />
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
  );
};
