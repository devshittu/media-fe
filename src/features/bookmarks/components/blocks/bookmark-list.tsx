import React, { useEffect } from 'react';
import { Bookmark, BookmarkListProps, BookmarkListResponse } from '../../types';
import { BookmarkItem } from './bookmark-item';
import { useInView } from 'react-intersection-observer';
import { InteractiveLoader } from '@/components/loading';
import { BookmarkMomentLoadingPlaceholder } from '../loading';

export const BookmarkList = ({
  useBookmarksHook,
  queryParams,
  isFinite,
  loadMoreOnScroll = false,
}: BookmarkListProps) => {
  const hookResponse = useBookmarksHook({ params: queryParams });

  const isResponseInfinite = 'fetchNextPage' in hookResponse;
  const dataFromBookmarks = isResponseInfinite
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

  const renderStories = (page: BookmarkListResponse) =>
    page.results.map((bookmark: Bookmark) => (
      <BookmarkItem
        key={bookmark.id}
        bookmark={bookmark}
        cacheRefQueryKey={hookResponse.queryKey}
      />
    ));

  return (
    <>
      <div className="mt-3 divide-y divider-slate-200 dark:divide-slate-700">
        {hookResponse.isLoading && <BookmarkMomentLoadingPlaceholder />}
        {dataFromBookmarks?.pages.map((page, i) => (
          <React.Fragment key={i}>{renderStories(page)}</React.Fragment>
        ))}
      </div>

      <div>
        {!hookResponse.isLoading && !isFinite && (
          <InteractiveLoader
            ref={ref}
            isLoading={hookResponse.isFetchingNextPage}
            hasNextPage={hookResponse.hasNextPage || false}
            onClick={hookResponse.fetchNextPage}
            loadingPlaceholder={<BookmarkMomentLoadingPlaceholder />}
          />
        )}
      </div>
    </>
  );
};
