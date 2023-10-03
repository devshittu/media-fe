import React, { useEffect } from 'react';
import {
  Storyline,
  StorylineListProps,
  StorylineListResponse,
} from '../../types';
import { StorylineItem } from './storyline-item';
import { useInfiniteStorylines } from '../../api/get-storylines';
import { useInView } from 'react-intersection-observer';
import { useUserFeedsStore } from '@/stores/feeds';
import { InteractiveLoader } from '@/components/loading';

export const StorylineList = ({
  data = {} as StorylineListResponse,
  queryParams,
}: StorylineListProps) => {
  const { ref, inView } = useInView();
  const { scrollPosition, setScrollPosition } = useUserFeedsStore();

  const {
    data: dataFromStorylines,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteStorylines({ initialData: data, params: queryParams });

  console.log('dataFromStorylines', dataFromStorylines);
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
    <>
      <div className="mt-3 divide-y divider-slate-200 dark:divide-slate-700">
        {dataFromStorylines?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page?.results?.map((storyline: Storyline) => (
              <StorylineItem key={storyline.id} storyline={storyline} />
            ))}
          </React.Fragment>
        ))}
      </div>

      <div>
        <InteractiveLoader
          ref={ref}
          isLoading={isFetchingNextPage}
          hasNextPage={hasNextPage || false}
          onClick={fetchNextPage}
          // loadingPlaceholder={<StoryListLoadingPlaceholder />}
        />
      </div>
    </>
  );
};
