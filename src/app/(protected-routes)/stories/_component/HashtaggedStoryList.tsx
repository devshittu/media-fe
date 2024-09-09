'use client';

import { useMemo } from 'react';
import { StoryList } from '@/features/stories';
import { useInfiniteStoriesByHashtag } from '@/features/stories/api/get-stories-by-hashtag';

type HashtaggedStoryListProps = {
  stories: any[]; // Replace with appropriate type
};

export default function HashtaggedStoryList({
  stories,
}: HashtaggedStoryListProps) {
  const queryParams = useMemo(
    () => ({
      page: 1,
      page_size: 10,
    }),
    [],
  );

  return (
    <>
      <StoryList
        useStoriesHook={useInfiniteStoriesByHashtag}
        queryParams={queryParams}
        loadMoreOnScroll
        initialData={stories}
      />
    </>
  );
}

// src/app/(protected-routes)/stories/hashtag/[hashtagId]/_component/HashtaggedStoryList.tsx
