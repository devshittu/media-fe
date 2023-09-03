import { NewsChannel } from '@/types';

export type User = {
  id: string;
  username: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  last_login: string;
  roles: string[];
  avatar_url: string;
  news_channel?: NewsChannel; // Or you could use id's here like: newsChannelIds: string[];
};

export type UserResponse = {
  users: User[];
  page: number;
  total_pages: number;
  total: number;
};

export type UserListProps = {
  data?: User[];
};

export type UserListItemProps = {
  user: User;
  onDelete?: (id: string) => void;
  onFollowSuccess?: (id: string) => void;
  onFollowFailure?: (id: string) => void;
};
