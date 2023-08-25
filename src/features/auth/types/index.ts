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
  username: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  last_login: string;
  roles: string[];
  avatar_url: string;
};
