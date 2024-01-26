import React, { useState, useEffect, useMemo, HTMLAttributes } from 'react';
import { useGetUsers } from '@/features/users/api/get-users';
import { User } from '@/features/auth';
import { UserListItem } from '../user';
import { UserListLoadingPlaceholder } from '../../loading';
import { NotificationType, useNotifications } from '@/stores/notifications';

type UserSuggestionListProps = HTMLAttributes<HTMLDivElement> & {
  numSuggestions?: number;
};

export const UserSuggestionList = React.memo(
  ({ numSuggestions = 3, ...props }: UserSuggestionListProps) => {
    const { showNotification } = useNotifications();
    const { data: responseData, isLoading } = useGetUsers({});
    const allSuggestionList = useMemo(
      () => responseData?.results,
      [responseData?.results],
    );
    const [suggestionList, setSuggestionList] = useState<User[] | null>(null);
    const [unsuggestedList, setUnsuggestedList] = useState<User[] | null>(null);

    useEffect(() => {
      if (allSuggestionList) {
        const initialSuggested = allSuggestionList.slice(0, numSuggestions);
        const initialUnsuggested = allSuggestionList.slice(numSuggestions);
        setSuggestionList(initialSuggested);
        setUnsuggestedList(initialUnsuggested);
      }
    }, [allSuggestionList, numSuggestions]);

    const handleDelete = (id: string) => {
      if (!suggestionList || !unsuggestedList) return;
      const numericId = parseInt(id, 10);
      const remainingUsers = suggestionList.filter(
        (user) => user.id !== numericId,
      );

      const nextUser = unsuggestedList[0];
      const updatedList = nextUser
        ? [...remainingUsers, nextUser]
        : [...remainingUsers];
      const updatedUnsuggestedList = unsuggestedList.slice(1);
      setSuggestionList(updatedList);
      setUnsuggestedList(updatedUnsuggestedList);
    };

    const handleFollowSuccess = (id: string) => {
      if (!suggestionList || !unsuggestedList) return;
      const numericId = parseInt(id, 10);
      const followedUser = suggestionList.filter(
        (user) => user.id === numericId,
      )[0];

      showNotification({
        type: NotificationType.SUCCESS,
        title: 'Success',
        duration: 5000,
        message: `You are now following ${followedUser.display_name}`,
      });
      handleDelete(id);
    };

    const handleFollowFailure = (id: string) => {
      if (!suggestionList || !unsuggestedList) return;
      const numericId = parseInt(id, 10);
      const followedUser = suggestionList.filter(
        (user) => user.id === numericId,
      )[0];
      console.error(
        `Follow failed for user with id: ${id} - ${followedUser.display_name}`,
      );
    };

    return (
      <>
        {`isLoading ${isLoading}`}
        <br></br>
        {`allSuggestionList ${JSON.stringify(allSuggestionList)}`}
        <br></br>
        {`suggestionList ${JSON.stringify(suggestionList)}`}
        {isLoading && <UserListLoadingPlaceholder />}
        <div
          className="divide-y divide-slate-200 dark:divide-slate-700"
          {...props}
        >
          {suggestionList?.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              onDelete={handleDelete}
              onFollowSuccess={handleFollowSuccess}
              onFollowError={handleFollowFailure}
            />
          ))}
        </div>
      </>
    );
  },
);

UserSuggestionList.displayName = 'UserSuggestionList';

// path: media-fe/src/features/users/components/blocks/suggestions/user-suggestion-list.tsx
