import { FeedPosition, Setting } from '@/features/settings';
import { Entity } from '@/types';

export type AuthResponse = {
  access_token: string;
  access_token_expires_at: number;
  refresh_token: string;
  token_id: string;
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
  display_name: string;
  username: string;
};
export type VerifyAccountData = {
  email: string;
  otp: string;
};

export type ResendOtpData = {
  email: string;
};

export type ForgotPasswordData = {
  email: string;
};

export type ResetPasswordData = {
  token: string;
  password: string;
};

export type ValidateTokenData = {
  token: string;
};
export type User = {
  id: number;
  display_name: string;
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
