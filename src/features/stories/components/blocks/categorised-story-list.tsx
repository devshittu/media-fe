import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Story,
  StoryListProps,
  StoryResponse,
  useInfiniteStoriesByHashtag,
} from '@/features/stories';
import { StoryListItem } from './story-list-item';
import { useUserFeedsStore } from '@/stores/feeds/user-feeds';
import { useCategoryContext } from '@/features/categories/hooks';
import { useInfiniteStoriesByCategory } from '../../api/get-stories-by-category';

export const CategorizedStoryList = ({
  data = {} as StoryResponse,
  queryParams,
}: StoryListProps) => {
  const { ref, inView } = useInView();
  const { scrollPosition, setScrollPosition } = useUserFeedsStore();
  const { categoryTitlesLookUpTable } = useCategoryContext();

  const {
    data: dataFromStories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteStoriesByCategory({ initialData: data, params: queryParams });

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
          {page?.stories?.map((story: Story) => (
            <StoryListItem
              key={story.id}
              story={story}
              categories={categoryTitlesLookUpTable}
            />
          ))}
        </React.Fragment>
      ))}

      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
};

// Path: src/components/blocks/stories/story-list.tsx
