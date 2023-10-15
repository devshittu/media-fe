import { User } from '@/features/auth';
import { NewsChannel, PaginatedResponse } from '@/types';


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

export type FollowerRelationshipResponse = {
  id: number;
  follower: User;
  followed: User;
};