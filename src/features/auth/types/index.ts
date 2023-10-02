import { Entity } from '@/types';

export type AuthUser = Entity & {
  email: string;
  // organizationId: string;
};

export type LoginData = {
  email: string;
  // password?: string;
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
