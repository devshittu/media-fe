'use client';

import { useMemo } from 'react';
import { StoryList } from '@/features/stories/components';
import { StoriesQueryParams, Story, useInfiniteUserFeedStories } from '@/features/stories';
import { useTabContentManager } from '@/components/blocks/tab';
import { useHomePageTabs } from '@/stores/tabs';
import { Discover } from '@/features/trends/components/discover/discover';
import { useInfiniteUserInvertedFeedStories } from '@/features/stories/api/get-user-inverse-feed-stories';
import { cleanObject } from '@/utils';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';

type ClientStoriesContentProps = {
  stories: Story[];
  userFeed: Story[];
  error?: string;
};

export default function ClientStoriesContent({
  stories,
  userFeed,
  error,
}: ClientStoriesContentProps) {
  const fetchDataForYou = useMemo(
    () => async () => {
      // Async operation for the "For You" tab
    },
    [],
  );
const queryParams: StoriesQueryParams = cleanObject({
    page: 1,
    page_size: PAGINATE_STORIES_LIMIT,
  });
  const fetchDataDiscover = useMemo(
    () => async () => {
      // Async operation for the "Discover" tab
    },
    [],
  );

  const tabsConfig = {
    discover: {
      content: (
        <>
          <Discover />
          <StoryList
            useStoriesHook={useInfiniteUserInvertedFeedStories}
            queryParams={{ page: 1, page_size: 3 }}
            isFinite
          />
        </>
      ),
      fetchData: fetchDataDiscover,
    },
    'for-you': {
      content: (
        <>
          <StoryList
            useStoriesHook={useInfiniteUserFeedStories}
            queryParams={queryParams}
            loadMoreOnScroll
          />
        </>
      ),
      fetchData: fetchDataForYou,
    },
  };

  const { handleScroll, contentRef, renderTabContent } = useTabContentManager(
    useHomePageTabs,
    tabsConfig,
  );

  return (
    <div ref={contentRef} onScroll={handleScroll} className="tab-content">
      {error && <p className="error-message">{error}</p>}
      {renderTabContent()}
    </div>
  );
}

// src/app/(protected-routes)/stories/ClientStoriesContent.tsx