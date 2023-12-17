import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Story,
  StoryListLoadingPlaceholder,
  StoryListProps,
  StoryListResponse,
  useInfiniteStoriesByHashtag,
} from '@/features/stories';
import { StoryListItem } from './story-list-item';
import { useUserFeedsStore } from '@/stores/feeds/user-feeds';
import { useCategoryContext } from '@/features/categories/hooks';
import { InteractiveLoader } from '@/components/loading/';

export const HashtaggedStoryList = ({
  data = {} as StoryListResponse,
  queryParams,
}: StoryListProps) => {
  const { ref, inView } = useInView();
  const { scrollPosition, setScrollPosition } = useUserFeedsStore();
  const { categoriesLookupTable } = useCategoryContext();

  const {
    data: dataFromStories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteStoriesByHashtag({ initialData: data, params: queryParams });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, []);

  useEffect(() => {
    return () => {
      setScrollPosition(window.scrollY);
    };
  }, []);

  return (
    <div>
      {dataFromStories?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page?.results?.map((story: Story) => (
            <StoryListItem key={story.id} story={story} />
          ))}
        </React.Fragment>
      ))}

      <div>
        <InteractiveLoader
          ref={ref}
          isLoading={isFetchingNextPage}
          hasNextPage={hasNextPage || false}
          onClick={fetchNextPage}
          loadingPlaceholder={<StoryListLoadingPlaceholder />}
        />
      </div>
    </div>
  );
};

// Path: src/features/stories/components/blocks/hashtagged-story-list.tsx
