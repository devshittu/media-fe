import { StoriesPageHeader } from '@/components/blocks/headers';
import UserLayout from '@/layouts/user-layout';
import React, { ReactElement, useMemo, useState } from 'react';
import { SidePanel } from '@/components/blocks/side-panel';
import { Bookmark, getBookmarks, useGetBookmarks } from '@/features/bookmarks';
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
import { PaginatedListQueryParams } from '@/types';

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

      {!bookmarks.results && <NotFound />}
      {bookmarks.results?.length > 0 && (
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
  const queryParams: PaginatedListQueryParams = cleanObject({
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
  });

  try {
    const bookmarks = await getBookmarks({ params: queryParams });
    console.log('Fetched bookmarks:', bookmarks);

    // Check if the results are empty
    if (!bookmarks.results || bookmarks.results.length === 0) {
      return {
        props: {
          error: 'No bookmarks found.',
          bookmarks: {
            links: {},
            count: 0,
            total_pages: 0,
            current_page: 0,
            results: [] as Bookmark[],
          },
          queryParams,
        },
      };
    }

    return {
      props: {
        bookmarks,
        queryParams,
      },
    };
  } catch (error) {
    console.error('Error fetching bookmarks in getServerSideProps:', error);

    return {
      props: {
        error:
          'There was an error fetching the bookmarks. Please try again later.',
        bookmarks: {
          links: {},
          count: 0,
          total_pages: 0,
          current_page: 0,
          results: [] as Bookmark[],
        },
        queryParams,
      },
    };
  }
};

export default BookmarksPage;
