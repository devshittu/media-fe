import React, { useEffect } from 'react';
import { Bookmark, BookmarkListProps, BookmarkListResponse } from '../../types';
import { BookmarkItem } from './bookmark-item';
import { useInfiniteBookmarks } from '../../api/get-bookmarks';
import { useInView } from 'react-intersection-observer';
import { useUserFeedsStore } from '@/stores/feeds';
import { InteractiveLoader } from '@/components/loading';

export const BookmarkList = ({
  data = {} as BookmarkListResponse,
  queryParams,
}: BookmarkListProps) => {
  const { ref, inView } = useInView();
  const { scrollPosition, setScrollPosition } = useUserFeedsStore();

  const {
    data: dataFromBookmarks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteBookmarks({ initialData: data, params: queryParams });
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
        {dataFromBookmarks?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page?.results?.map((bookmark: Bookmark) => (
              <BookmarkItem key={bookmark.id} bookmark={bookmark} />
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
