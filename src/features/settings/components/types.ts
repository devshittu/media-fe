import { Setting } from '../types';
export type SettingsFieldLinkProps = {
  id: string;
  title: string;
  description?: string;
  linkHref?: string;
};

export type SettingsFieldProps = {
  id: string;
  title: string;
  fieldName?: string;
  fieldPlaceholder?: string;
  fieldType?:
    | 'checkbox'
    | 'switch'
    | 'custom'
    | 'dropdown'
    | 'text'
    | 'textarea';
  description?: string | React.ReactNode;
  children?: React.ReactNode;
};

export type SettingsFieldsetProps = {
  id: string;
  title: string;
  description?: string | React.ReactNode;
  children: React.ReactNode;
};

export type SettingsSectionProps = {
  initialSettingValues?: Setting;
  // onSuccess?: () => void;
};
