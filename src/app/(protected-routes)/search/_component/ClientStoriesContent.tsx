'use client';

import { useMemo } from 'react';
import { StoryList } from '@/features/stories/components';
import {
  StoriesQueryParams,
  Story,
  useInfiniteUserFeedStories,
} from '@/features/stories';
import { useTabContentManager } from '@/components/blocks/tab';
import { useHomePageTabs, useSearchPageTabs } from '@/stores/tabs';
import { Discover } from '@/features/trends/components/discover/discover';
import { useInfiniteUserInvertedFeedStories } from '@/features/stories/api/get-user-inverse-feed-stories';
import { cleanObject } from '@/utils';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { useSearchParams } from 'next/navigation';
import { useInfiniteSearchStories } from '@/features/search';

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
    const searchParams = useSearchParams()
 
  const search = searchParams?.get('q') || '';

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
    'searchStories': {
      content: (
        <>
        {"The search results: for "+ search}
          <StoryList
            useStoriesHook={useInfiniteSearchStories}
            queryParams={{ q: search, ...queryParams }}
            loadMoreOnScroll
          />
        </>
      ),
      fetchData: fetchDataForYou,
    },
    searchStorylines: {
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
  };

  const { handleScroll, contentRef, renderTabContent } = useTabContentManager(
    useSearchPageTabs,
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
