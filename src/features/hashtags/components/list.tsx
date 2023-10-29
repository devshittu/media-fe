import React, { memo, useMemo, useState } from 'react';
import { HashtagListItem } from './list-item';
import { HashtagListProps } from './types';
import { Hashtag, useHashtags } from '@/features/hashtags';
import { LoadingButtonTextList } from '@/components/loading/loading-button-text-list';
import { Button } from '@/components/button';

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
        {isLoading && <LoadingButtonTextList wrapped />}
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

type ExpandableHashtagListProps = {
  hashtags: Hashtag[];
  size?: 'small' | 'base' | 'large';
  initialVisibleCount?: number; // Prop to set the initial number of visible hashtags
  isLoading?: boolean; // Prop to show a loading state
};
export const ExpandableHashtagList = memo(
  ({
    hashtags,
    initialVisibleCount = 5,
    size = 'base',
    isLoading = false,
  }: ExpandableHashtagListProps) => {
    const [expanded, setExpanded] = useState(false);
    const visibleHashtags = expanded
      ? hashtags
      : hashtags.slice(0, initialVisibleCount);

    if (isLoading) {
      return <LoadingButtonTextList wrapped />;
    }

    return (
      <div title="Hashtags" className="flex justify-start mb-4 md:mb-8 ">
        {hashtags.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {visibleHashtags.map((hashtag, i) => (
              <HashtagListItem key={i} hashtag={hashtag} size={size} />
            ))}
            {hashtags.length > initialVisibleCount && (
              <Button
                onClick={() => setExpanded(!expanded)}
                className="mt-2x underline"
              >
                {expanded ? 'See less' : 'See more'}
              </Button>
            )}
          </div>
        ) : (
          <p>No hashtag found</p>
        )}
      </div>
    );
  },
);

ExpandableHashtagList.displayName = 'ExpandableHashtagList';
