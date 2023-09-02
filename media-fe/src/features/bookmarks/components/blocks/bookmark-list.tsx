import React, { useEffect } from 'react';
import { Bookmark, BookmarkListProps, BookmarkResponse } from '../../types';
import { BookmarkItem } from './bookmark-item';
import { useInfiniteBookmarks } from '../../api/get-bookmarks';
import { useInView } from 'react-intersection-observer';
import { useUserFeedsStore } from '@/stores/feeds';

export const BookmarkList = ({
  data = {} as BookmarkResponse,
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

  console.log('dataFromBookmarks', dataFromBookmarks);
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
      <ol className="mt-3 divide-y divider-slate-200 dark:divide-slate-700">
        {dataFromBookmarks?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page?.bookmarks?.map((bookmark: Bookmark) => (
              <BookmarkItem key={bookmark.id} bookmark={bookmark} />
            ))}
          </React.Fragment>
        ))}
      </ol>
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
    </>
  );
};
