import React, { useMemo } from 'react';
import { HashtagListItem } from './list-item';
import { HashtagListProps } from './types';
import { Hashtag, useHashtags } from '@/features/hashtags';
import { LoadingButtonTextList } from '@/components/loading/loading-button-text-list';

export const HashtagList = React.memo(
  ({ dataItems = [] }: HashtagListProps) => {
    const { data: responseData, isLoading } = useHashtags({
      params: { page_size: 15 },
    }); // Use data and isLoading directly from the hook

    const stableHashtags = useMemo(
      () => responseData?.results,
      [responseData?.results],
    );
    return (
      <>
        {isLoading && <LoadingButtonTextList />}
        {stableHashtags?.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {stableHashtags.map((hashtag: Hashtag, i) => (
              <HashtagListItem key={i} hashtag={hashtag} />
            ))}
          </div>
        )}
      </>
    );
  },
);

HashtagList.displayName = 'HashtagList';
