import React, { useEffect } from 'react';
import { Bookmark, BookmarkListProps, BookmarkListResponse } from '../../types';
import { BookmarkItem } from './bookmark-item';
import { useInfiniteBookmarks } from '../../api/get-bookmarks';
import { useInView } from 'react-intersection-observer';
import { useUserFeedsStore } from '@/stores/feeds';
import { InteractiveLoader } from '@/components/loading';
import { StoryListLoadingPlaceholder } from '@/features/stories';

export const BookmarkList = ({
  useBookmarksHook,
  queryParams,
  isFinite,
  loadMoreOnScroll = false,
}: BookmarkListProps) => {

  // const { ref, inView } = useInView();
  // const { scrollPosition, setScrollPosition } = useUserFeedsStore();

  // const {
  //   data: dataFromBookmarks,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useInfiniteBookmarks({ initialData: data, params: queryParams });
  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage();
  //   }
  // }, [inView]);

  // useEffect(() => {
  //   window.scrollTo(0, scrollPosition);
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     setScrollPosition(window.scrollY);
  //   };
  // }, []);

  const hookResponse = useBookmarksHook({ params: queryParams });

  const isResponseInfinite = 'fetchNextPage' in hookResponse;
  const dataFromBookmarks = isResponseInfinite
    ? hookResponse.data
    : { pages: [hookResponse] };

    console.log(`dataFromBookmarks:// `, dataFromBookmarks)
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
         key={bookmark.id} bookmark={bookmark}
        cacheRefQueryKey={hookResponse.queryKey}
      />
    ));

  return (
    <>
      <div className="mt-3 divide-y divider-slate-200 dark:divide-slate-700">
        {/* {dataFromBookmarks?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page?.results?.map((bookmark: Bookmark) => (
              <BookmarkItem key={bookmark.id} bookmark={bookmark} />
            ))}
          </React.Fragment>
        ))} */}

      {hookResponse.isLoading && <StoryListLoadingPlaceholder />}
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
          // loadingPlaceholder={<StoryListLoadingPlaceholder />}
        />
      )}
      </div>
    </>
  );
};
