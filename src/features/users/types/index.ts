import { NewsChannel, PaginatedResponse } from '@/types';

export type User = {
  id: string;
  username: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  last_login: string;
  roles: string[];
  avatar_url?: string | null;
  news_channel?: NewsChannel; // Or you could use id's here like: newsChannelIds: string[];
};

export type UserListResponse = PaginatedResponse<User>;

export type UserListProps = {
  data?: User[];
};

export type UserListItemProps = {
  user: User;
  onDelete?: (id: string) => void;
  onFollowSuccess?: (id: string) => void;
  onFollowFailure?: (id: string) => void;
};
