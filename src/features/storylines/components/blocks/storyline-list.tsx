'use client';
import React, { useEffect, useMemo } from 'react';
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
import { ResponseStatusWidget } from '@/components/blocks/response-status/response-status';
import { StorylineItemSkeleton } from '../loading/storyline-item-loading-placeholder';

export const StorylineList = ({
  data = {} as StorylineListResponse,
  queryParams,
}: StorylineListProps) => {
  const { ref, inView } = useInView();
  const { scrollPosition, setScrollPosition } = useUserFeedsStore();

  const {
    data: dataFromStorylines,
    isLoading,
    count: resultCount,
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

  const Nodata = useMemo(
    () => (
      <ResponseStatusWidget
        title="No Record match"
        subtitle="No Record match"
        isSuccess
      />
    ),
    [],
  );
  return (
    <>
      <div className="mt-3 divide-y divider-slate-200 dark:divide-slate-700">
        {isLoading && <StorylineItemSkeleton />}
        {!isLoading &&
          resultCount === 0 &&
          dataFromStorylines?.pages?.length &&
          Nodata}
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
