'use client';

import { useMemo } from 'react';
import { StoryList } from '@/features/stories';
import { useInfiniteStoriesByCategory } from '@/features/stories/api/get-stories-by-category';

type CategorizedStoryListProps = {
  stories: any[]; // Replace with the appropriate type
};

export default function CategorizedStoryList({
  stories,
}: CategorizedStoryListProps) {
  const queryParams = useMemo(
    () => ({
      page: 1,
      page_size: 10,
    }),
    []
  );

  return (
    <StoryList
      useStoriesHook={useInfiniteStoriesByCategory}
      queryParams={queryParams}
      loadMoreOnScroll
      initialData={stories}
    />
  );
}
