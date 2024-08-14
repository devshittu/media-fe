'use client';
import React, { useEffect, useMemo, useState } from 'react';

import { useGetUsers } from '../../../api/get-users';
import { UserListLoadingPlaceholder } from '../../loading';
import { User, UserListProps } from '../../../types';
import { UserListItem } from './list-item';

export const UserList = React.memo(({ data = [] }: UserListProps) => {
  const { data: responseData, isLoading } = useGetUsers({}); // Use data and isLoading directly from the hook

  const stableUsers = useMemo(() => responseData?.users, [responseData?.users]);

  return (
    <>
      {isLoading && <UserListLoadingPlaceholder />}
      {stableUsers?.length > 0 && (
        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
          {stableUsers.map((user: User) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </ul>
      )}
    </>
  );
});

UserList.displayName = 'UserList';
