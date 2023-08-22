import React, { useMemo } from 'react';
import { HashtagListItem } from './list-item';
import { HashtagListProps } from './types';
import { HashtagItem } from '@/testing';
import { useHashtags } from '@/features/hashtags';
import { LoadingButtonTextList } from '@/components/loading/loading-button-text-list';

export const HashtagList = React.memo(
  ({ dataItems = [] }: HashtagListProps) => {
    const { data: responseData, isLoading } = useHashtags({}); // Use data and isLoading directly from the hook

    const stableHashtags = useMemo(
      () => responseData?.hashtags,
      [responseData?.hashtags],
    );
    return (
      <>
        {isLoading && <LoadingButtonTextList />}
        {stableHashtags?.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {stableHashtags.map((hashtag: HashtagItem) => (
              <HashtagListItem key={hashtag.id} hashtag={hashtag} />
            ))}
          </div>
        )}
      </>
    );
  },
);

HashtagList.displayName = 'HashtagList';
