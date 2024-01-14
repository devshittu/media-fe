import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Story,
  StoryListProps,
  StoryListResponse,
  InfiniteStoriesResponse,
} from '@/features/stories';
import { StoryListLoadingPlaceholder } from '@/features/stories/components/loading';
import { StoryListItem } from './story-list-item';
import { InteractiveLoader } from '@/components/loading/';
import ResponseStatusWidget from '@/components/blocks/response-status/response-status';

export const StoryList = ({
  useStoriesHook,
  queryParams,
  isFinite,
  loadMoreOnScroll = false, // Default value is true
}: StoryListProps) => {
  const hookResponse = useStoriesHook({ params: queryParams });

  const isResponseInfinite = 'fetchNextPage' in hookResponse;
  const dataFromStories = isResponseInfinite
    ? hookResponse.data
    : { pages: [hookResponse] };

  const { ref, inView } = useInView({
    skip: isFinite || !loadMoreOnScroll, // Skip inView functionality based on props
  });

  useEffect(() => {
    if (
      inView &&
      isResponseInfinite &&
      hookResponse.hasNextPage &&
      loadMoreOnScroll
    ) {
      hookResponse.fetchNextPage();
    }
  }, [inView, hookResponse, loadMoreOnScroll, isResponseInfinite]);

  const renderStories = (page: StoryListResponse) =>
    page.results.map((story: Story) => (
      <StoryListItem
        key={story.id}
        story={story}
        cacheRefQueryKey={hookResponse.queryKey}
      />
    ));
  const Nodata = (
    <ResponseStatusWidget
      title="No Record match"
      subtitle="No Record match"
      isSuccess
      // ctaText="Continue"
      // ctaOnClick={handleStartAccountSetupSequence}
    />
  );

  return (
    <div>
      {/* {`hookResponse.isLoading: ${hookResponse.isLoading} hookResponse.isFetchingNextPage: ${hookResponse.isFetchingNextPage}`} */}
      {hookResponse.isLoading && <StoryListLoadingPlaceholder />}
      {!hookResponse.isLoading && hookResponse.count === 0 && Nodata}
      {dataFromStories?.pages.map((page, i) => (
        <React.Fragment key={i}>{renderStories(page)}</React.Fragment>
      ))}

      {!hookResponse.isLoading && !isFinite && (
        <InteractiveLoader
          ref={ref}
          isLoading={hookResponse.isFetchingNextPage}
          hasNextPage={hookResponse.hasNextPage || false}
          onClick={hookResponse.fetchNextPage}
          loadingPlaceholder={<StoryListLoadingPlaceholder />}
        />
      )}
    </div>
  );
};

// Path: src/features/stories/components/blocks/story-list.tsx
