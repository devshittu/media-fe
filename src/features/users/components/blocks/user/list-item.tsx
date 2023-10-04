import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/button';
import { UserListItemProps } from '@/features/users/types';
import { useUser } from '@/features/users/hooks/useUser';
import { LoadingAvatar } from '@/components/loading';

export const UserListItem = ({
  user,
  onDelete,
  onFollowSuccess,
  onFollowFailure,
}: UserListItemProps) => {
  const { handleFollowUser, isFollowLoading } = useUser(user.id);
  const handleIgnoreClick = async () => onDelete?.(user.id);
  const handleFollowClick = async () => {
    await handleFollowUser(
      () => {
        onFollowSuccess?.(user.id);
      },
      () => {
        onFollowFailure?.(user.id);
      },
    );
  };
  const defaultAvatar = '/avatars/avatar.svg';

  return (
    <div className="py-3 sm:py-4">
      <div className="relative flex items-center space-x-4">
        <div className="flex-shrink-0">
          {!user.avatar_url ? (
            <LoadingAvatar />
          ) : (
            <Image
              width="48"
              height="48"
              className="rounded-md w-14 h-14"
              src={user.avatar_url || defaultAvatar}
              alt="Avatar image"
              loading="lazy"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
            {user.name}
          </h2>
          <h3 className="text-sm text-slate-500 truncate dark:text-slate-400">
            {`@` + user.username}
          </h3>
        </div>
        <div className="inline-flex space-x-3 items-center text-base font-semibold text-gray-900 dark:text-white">
          <Button
            className=""
            loading={isFollowLoading}
            onClick={handleFollowClick}
          >
            {'Follow'}
          </Button>
          <Button className="" onClick={handleIgnoreClick}>
            Ignore
          </Button>
        </div>
      </div>
    </div>
  );
};
// Path: media-fe/src/features/users/components/blocks/user/list-item.tsx
