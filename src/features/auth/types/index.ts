import { FeedPosition, Setting } from '@/features/settings';
import { Entity } from '@/types';

export type AuthResponse = {
  access_token: string;
};

export type VerifyOTPAndAuthResponse = AuthResponse & {
  message: string;
};

export type PasswordSigninData = {
  email: string;
  username_or_email?: string;
  password?: string;
};
export type SignupData = {
  email: string;
  password: string;
  name: string;
  username: string;
};
export type VerifyAccountData = {
  email: string;
  otp: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  avatar_url: string | null;
  display_picture: string | null;
  bio: string;
  phone_number: string;
  last_activity: string;
  roles: string[];
  is_active: boolean;
  is_staff: boolean;
  has_completed_setup: boolean;
};

export type AuthUser = User & {
  settings?: Setting;
  feed_position?: FeedPosition;
};

export type AuthUserTileProps = {
  actionButtonText: string;
  closeIcon?: React.ReactNode;
};

// Path: src/features/auth/types/index.ts
