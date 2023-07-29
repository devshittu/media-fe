import React from 'react';
import { HashtagListItem } from './list-item';
import { HashtagListProps } from './types';
import { HashtagItem } from '@/testing';
import { useHashtags } from '@/features/hashtags';
import { HashtagsPlaceholder } from './hashtags-placeholder';

export const HashtagList = React.memo(
  ({ dataItems = [] }: HashtagListProps) => {
    const { data, isLoading } = useHashtags({}); // Use data and isLoading directly from the hook

    return (
      <>
        {!data && isLoading ? (
          <HashtagsPlaceholder />
        ) : (
          <div className="flex gap-4 flex-wrap">
            {data.map((hashtag: HashtagItem) => (
              <HashtagListItem key={hashtag.id} hashtag={hashtag} />
            ))}
          </div>
        )}
      </>
    );
  },
);

HashtagList.displayName = 'HashtagList';
