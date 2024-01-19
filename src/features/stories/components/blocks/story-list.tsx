import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { Story, StoryListProps, StoryListResponse } from '@/features/stories';
import { StoryListLoadingPlaceholder } from '@/features/stories/components/loading';
import { StoryListItem } from './story-list-item';
import { InteractiveLoader } from '@/components/loading/';
import { ResponseStatusWidget } from '@/components/blocks/response-status/response-status';
import { useElementAvailable } from '@/hooks';
import { CustomMotionComponent } from '@/components/animations';

export const StoryList = React.memo(
  ({
    useStoriesHook,
    queryParams,
    isFinite,
    loadMoreOnScroll = false,
    currentStoryId,
  }: StoryListProps) => {
    const hookResponse = useStoriesHook({ params: queryParams });
    const isResponseInfinite = 'fetchNextPage' in hookResponse;
    const dataFromStories = useMemo(
      () =>
        isResponseInfinite ? hookResponse.data : { pages: [hookResponse] },
      [hookResponse, isResponseInfinite],
    );

    const { ref, inView } = useInView({
      skip: isFinite || !loadMoreOnScroll,
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

    const renderStories = useCallback(
      (page: StoryListResponse) =>
        page?.results?.map((story: Story) => (
          <StoryListItem
            key={story.id}
            story={story}
            cacheRefQueryKey={hookResponse.queryKey}
          />
        )),
      [hookResponse.queryKey],
    );

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

    const controls = useAnimation();
    const listRef = useRef<HTMLDivElement>(null);

    const scrollToStory = useCallback(() => {
      const storyElement = document.getElementById(
        `scroll-to-${currentStoryId}`,
      );
      if (storyElement && listRef.current) {
        const storyRect = storyElement.getBoundingClientRect();
        const offsetTop = window.scrollY + storyRect.top - 10;
        window.scrollTo({ top: offsetTop, behavior: 'instant' });

        const timeoutId = setTimeout(() => {
          controls.start({ y: 148 }).then(() => {
            controls.start({ y: 0 });
          });
        }, 1000);

        return () => clearTimeout(timeoutId);
      }
    }, [currentStoryId, controls]);

    useElementAvailable(`scroll-to-${currentStoryId}`, scrollToStory);

    return (
      <div>
        <CustomMotionComponent
          ref={listRef}
          animate={controls}
          initial={{ y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 5.8,
          }}
          className="story-list-container"
        >
          {hookResponse.isLoading && <StoryListLoadingPlaceholder />}
          {!hookResponse.isLoading &&
            hookResponse.count === 0 &&
            hookResponse?.data?.pages?.length &&
            Nodata}
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
        </CustomMotionComponent>
      </div>
    );
  },
);

StoryList.displayName = 'StoryList';
// Path: src/features/stories/components/blocks/story-list.tsx
