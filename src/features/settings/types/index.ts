import { Category } from '@/features/categories';

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
  account: number; // email about the user's account
  marketing: number; // email about the marketing, products and promotions
  updates: number; // newly on-boarded features/announcements
};
// export type SMSNotificationSettingsData = {
//   account: number; // sms about the user's account
//   marketing: number; // sms about the marketing, products and promotions
//   updates: number; // newly on-boarded features/announcements
// };
export type AccountSettingsData = {
  display_name: string;
  email: string;
};
export type SystemSettingsData = {
  theme: string;
  language: string;
};

export type PersonalSettingsData = {
  favorite_categories: (string | Category)[];
};
