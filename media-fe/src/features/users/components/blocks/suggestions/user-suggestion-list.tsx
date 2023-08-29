import React, { useState, useEffect, useMemo } from 'react';
import { useGetUsers } from '@/features/users/api/get-users';
import { User } from '@/features/users/types';
import { UserListItem } from '../user';
import { UserListLoadingPlaceholder } from '../../loading';
import { useFollowUser } from '@/features/users/api/follow-user';

export const UserSuggestionList = () => {
  const { data: responseData, isLoading } = useGetUsers({});
  // const { submit: submitFollowUser, isLoading: isLoadingFollowUser } = useFollowUser({});
  const allSuggestionList = useMemo(
    () => responseData?.users,
    [responseData?.users],
  );
  const [suggestionList, setSuggestionList] = useState<User[] | null>(null);
  const [unsuggestedList, setUnsuggestedList] = useState<User[] | null>(null);

  useEffect(() => {
    if (allSuggestionList) {
      console.log('All Suggestion List updated:', allSuggestionList);
      const initialSuggested = allSuggestionList.slice(0, 3);
      const initialUnsuggested = allSuggestionList.slice(3);
      setSuggestionList(initialSuggested);
      setUnsuggestedList(initialUnsuggested);
    }
  }, [allSuggestionList]);

  const handleDelete = (id: string) => {
    if (!suggestionList || !unsuggestedList) return;

    // Step 1: Remove the deleted user
    const remainingUsers = suggestionList.filter((user) => user.id !== id);

    // Step 2: Find the next user to add
    const nextUser = unsuggestedList[0]; // Take the first user from the unsuggested list

    // Step 3: Add the next user to the remaining users
    const updatedList = nextUser
      ? [...remainingUsers, nextUser]
      : [...remainingUsers];

    // Step 4: Update the unsuggested list
    const updatedUnsuggestedList = unsuggestedList.slice(1);

    // Step 5: Update the states
    setSuggestionList(updatedList);
    setUnsuggestedList(updatedUnsuggestedList);
    // Todo: deleteUser.mutate(id);
  };

  const handleFollowSuccess = (id: string) => {
    handleDelete(id);
  };
  const handleFollowFailure = (id: string) => {
    // Handle follow failure logic here, if needed
    console.error(`Follow failed for user with id: ${id}`);
  };

  return (
    <>
      {isLoading && <UserListLoadingPlaceholder />}

      <ul className="divide-y divide-slate-200 dark:divide-slate-700">
        {suggestionList?.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            onDelete={handleDelete}
            onFollowSuccess={handleFollowSuccess}
            onFollowFailure={handleFollowFailure}
          />
        ))}
      </ul>
    </>
  );
};
