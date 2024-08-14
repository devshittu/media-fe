'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoryList } from '@/features/stories';
import { useInfiniteStorylineStories } from '@/features/storylines/api/get-storyline-stories';

type ClientStorylinePageProps = {
  error: string | null;
  storyline: any; // Use the correct type here
  storylineStories: any[];
  storylineHashtags: any[];
  storylineId: string;
  queryParams: any;
};

const ClientStorylinePage = ({
  error,
  storylineId,
  queryParams,
}: ClientStorylinePageProps) => {
  const searchParams = useSearchParams();
  const [currentStoryId, setCurrentStoryId] = useState<string | undefined>(
    undefined,
  );

  // Extract current_story from the search params
  useEffect(() => {
    const currentStory = searchParams?.get('current_story');
    if (currentStory && typeof currentStory === 'string') {
      setCurrentStoryId(currentStory);
    }
  }, [searchParams]);

  return (
    <>
      <StoriesPageHeader pageTitle="Storyline" />
      <StoryList
        useStoriesHook={useInfiniteStorylineStories}
        currentStoryId={currentStoryId}
        queryParams={{ storylineId, page: 1, page_size: 100 }}
        loadMoreOnScroll
      />
    </>
  );
};

export default ClientStorylinePage;
