import { Category } from '@/features/categories';

export type FeedPosition = {
  last_story_read: string | null;
};
export type UpdatePasswordData = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

export type UpdateUserProfileData = {
  username?: string;
  email?: string;
  display_name?: string;
};
export type Setting = {
  id: string;
  user_id: string;
  system_settings: SystemSettingsData;
  account_settings: AccountSettingsData;
  notification_settings: SettingNotification;
  personal_settings: PersonalSettingsData;
  last_updated: number;
  created_at: number;
  updated_at: number;
};
export type SettingNotification = {
  email: NotificationSettingsData;
  // short_message_service?: SMSNotificationSettingsData;
};
export type NotificationSettingsData = {
  account: boolean; // email about the user's account
  marketing: boolean; // email about the marketing, products and promotions
  updates: boolean; // newly on-boarded features/announcements
};
// export type SMSNotificationSettingsData = {
//   account: number; // sms about the user's account
//   marketing: number; // sms about the marketing, products and promotions
//   updates: number; // newly on-boarded features/announcements
// };
export type AccountSettingsData = {
  display_name: string;
  email: string;
  username: string;
};
export type SystemSettingsData = {
  theme: string;
  language: string;
};

export type PersonalSettingsData = {
  favorite_categories: (string | Category)[];
};

// Path: src/features/settings/types/index.ts
