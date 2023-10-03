import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Story, StoryListProps, StoryListResponse } from '@/features/stories';
import { StoryListLoadingPlaceholder } from '@/features/stories/components/loading';
import { StoryListItem } from './story-list-item';
import { useUserFeedsStore } from '@/stores/feeds/user-feeds';
import { useInfiniteStories } from '@/features/stories/api/get-stories';
import { useCategoryContext } from '@/features/categories/hooks';
import { InteractiveLoader } from '@/components/loading/';

export const StoryList = ({
  data = {} as StoryListResponse,
  queryParams,
}: StoryListProps) => {
  const { ref, inView } = useInView();
  const { scrollPosition, setScrollPosition } = useUserFeedsStore();
  const { categoryLookupTable, categories } = useCategoryContext();
  const {
    data: dataFromStories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteStories({ initialData: data, params: queryParams });

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
            <StoryListItem
              key={story.id}
              story={story}
              categories={categoryLookupTable}
            />
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

// Path: src/features/stories/components/blocks/story-list.tsx
