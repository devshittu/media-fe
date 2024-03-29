import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/button';
import { UserListItemProps } from '@/features/users/types';
import { useUserAction } from '@/features/users/hooks/useUserAction';
import { LoadingAvatar } from '@/components/loading';

export const UserListItem = ({
  user,
  onDelete,
  onFollowSuccess,
  onFollowError,
}: UserListItemProps) => {
  const userId = user.id as unknown as string;
  const { handleFollowUser, isFollowLoading } = useUserAction(userId);
  const handleIgnoreClick = async () => onDelete?.(userId);
  const handleFollowClick = async () => {
    await handleFollowUser(
      () => {
        onFollowSuccess?.(userId);
      },
      () => {
        onFollowError?.(userId);
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
            {user.display_name}
          </h2>
          <h3 className="text-sm text-slate-500 truncate dark:text-slate-400">
            {`@` + user.username}
          </h3>
        </div>
        <div className="inline-flex space-x-3 items-center text-base font-semibold text-slate-900 dark:text-white">
          <Button
            id={`id-follow-button`}
            className=""
            loading={isFollowLoading}
            onClick={handleFollowClick}
          >
            {'Follow'}
          </Button>
          <Button
            id={`id-ignore-button`}
            className=""
            onClick={handleIgnoreClick}
          >
            {'Ignore'}
          </Button>
        </div>
      </div>
    </div>
  );
};
// Path: media-fe/src/features/users/components/blocks/user/list-item.tsx
