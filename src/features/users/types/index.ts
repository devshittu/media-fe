import { User } from '@/features/auth';
import { PaginatedResponse, ResponseStatus } from '@/types';

export type UserListResponse = PaginatedResponse<User>;

export type UserListProps = {
  data?: User[];
};

export type UserListItemProps = {
  user: User;
  onDelete?: (id: string) => void;
  onFollowSuccess?: (id: string) => void;
  onFollowError?: (id: string) => void;
};
export type FollowerRelationshipResponse = ResponseStatus & {
  id: number;
  follower: User;
  followed: User;
};
