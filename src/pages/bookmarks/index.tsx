import { StoriesPageHeader } from '@/components/blocks/headers';
import UserLayout from '@/layouts/user-layout';
import React, { ReactElement, useMemo, useState } from 'react';
import { SidePanel } from '@/components/blocks/side-panel';
import {
  Bookmark,
  BookmarksQueryParams,
  getBookmarks,
  useGetBookmarks,
} from '@/features/bookmarks';
import { useListGrouping, useListSorting } from '@/hooks';
import {
  BookmarkSorter,
  BookmarkMoment,
  BookmarkMomentLoadingPlaceholder,
  BookmarkList,
} from '@/features/bookmarks/components/';
import { StoriesPageFrame } from '@/components/frames';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { cleanObject } from '@/utils';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { NotFound } from '@/components/not-found';

type PublicBookmarkPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const BookmarksPage = ({ bookmarks, queryParams }: PublicBookmarkPageProps) => {
  // const [selected, setSelected] = useState<string>('dateAdded');

  // const { data: responseData, isLoading } = useGetBookmarks({});
  // const stableBookmarks = useMemo(
  //   () => responseData?.bookmarks,
  //   [responseData?.bookmarks],
  // );

  // const formatDate = (timestamp: number) => {
  //   return new Date(timestamp * 1000).toLocaleDateString('en-US', {
  //     day: 'numeric',
  //     month: 'long',
  //     year: 'numeric',
  //   });
  // };

  // // Group bookmarks by date
  // const groupedItems = useListGrouping<Bookmark>(
  //   bookmarks?.bookmarks as Bookmark[],
  //   'created_at',
  //   formatDate,
  // );

  // // Sort the grouped bookmarks
  // const { sortedData, sortOrder, toggleSortOrder } = useListSorting(
  //   Object.entries(groupedItems),
  //   '0', // since the data is an array of [date, items], we sort by the date which is at index 0
  //   'desc',
  // );

  // const { sortedData, sortOrder, toggleSortOrder } = useListSorting(Object.entries(groupedItems), 'created_at', 'desc');

  return (
    <>
      <StoriesPageHeader pageTitle="Bookmarks" />
      {/* {isLoading && (
        <>
          <BookmarkMomentLoadingPlaceholder />
        </>
      )} */}

      {!bookmarks.bookmarks && <NotFound />}
      {bookmarks.bookmarks?.length > 0 && (
        <BookmarkList data={bookmarks} queryParams={queryParams} />
      )}
      {/* {sortedData?.length > 0 && (
        <section className="space-y-8">
          <button onClick={toggleSortOrder}>
            Sort by {sortOrder === 'desc' ? 'Earliest' : 'Latest'}
          </button>
          <BookmarkSorter
            selectedValue={selected}
            onSelect={(value) => setSelected(value)}
          />
          {sortedData.map(([date, items]) => (
            <React.Fragment key={date}>
              <BookmarkMoment time={date} momentData={items} />
            </React.Fragment>
          ))}

        </section>
      )} */}
    </>
  );
};

BookmarksPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageFrame>{page}</StoriesPageFrame>
    </UserLayout>
  );
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const queryParams: BookmarksQueryParams = cleanObject({
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
  });

  try {
    const bookmarks = await getBookmarks({
      params: queryParams,
    });

    return {
      props: {
        bookmarks,
        queryParams,
      },
    };
  } catch (error) {
    return {
      props: {
        bookmarks: {
          bookmarks: [] as Bookmark[],
          page: 1,
          total_pages: 0,
          total: 0,
        },
        queryParams,
      },
    };
  }
};

export default BookmarksPage;
