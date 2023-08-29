import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/button';
import { UserListItemProps } from '@/features/users/types';
import { useUser } from '@/features/users/hooks/useUser';

export const UserListItem = ({
  user,
  onDelete,
  onFollowSuccess,
  onFollowFailure,
}: UserListItemProps) => {
  const { handleFollowUser, isUserFollowed } = useUser(user.id, false);
  const handleFollowClick = async () => {
    try {
      // Your logic to follow the user
      // ...
      const isFollowSuccessful = await handleFollowUser();

      console.log(isFollowSuccessful, isUserFollowed);
      if (isUserFollowed) {
        onFollowSuccess?.(user.id);
      } else {
        onFollowFailure?.(user.id);
      }
    } catch (error) {
      onFollowFailure?.(user.id);
    }
  };

  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Image
            width="48"
            height="48"
            className="rounded-md w-14 h-14"
            src={user.avatar_url}
            alt="Avatar image"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
            {user.name}
          </p>
          <p className="text-sm text-slate-500 truncate dark:text-slate-400">
            {`@` + user.username}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {/* onClick={() => onDelete?.(user.id)} */}
          <Button className="rounded-lg" onClick={handleFollowClick}>
            Subscribe
          </Button>
        </div>
      </div>
    </li>
  );
};
