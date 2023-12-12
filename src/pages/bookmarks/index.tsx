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
import { useBookmarkPageTabs } from '@/stores/tabs';
import { useTabContentManager } from '@/components/blocks/tab';

type PublicBookmarkPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const BookmarksPage = ({
  bookmarks,
  queryParams,
  error,
}: PublicBookmarkPageProps) => {
  // Filter bookmarks for each category
  const savedBookmarks = useMemo(
    () =>
      bookmarks.results?.filter((b) => b.bookmark_category === 'Save') || [],
    [bookmarks.results],
  );
  const readLaterBookmarks = useMemo(
    () =>
      bookmarks.results?.filter((b) => b.bookmark_category === 'Read Later') ||
      [],
    [bookmarks.results],
  );
  const favoriteBookmarks = useMemo(
    () =>
      bookmarks.results?.filter((b) => b.bookmark_category === 'Favorites') ||
      [],
    [bookmarks.results],
  );

  // Define asynchronous functions for each tab
  const fetchDataForYou = async () => {
    // Async operation for the "For You" tab
    console.log('TabTest: Fetching data for you');
  };

  const fetchDataFollowing = async () => {
    // Async operation for the "Following" tab
    console.log('TabTest: Fetching data  following ');
  };

  const tabsConfig = {
    save: {
      content: (
        <>
          <h1>Save</h1>
          {!savedBookmarks.length && <NotFound />}
          {savedBookmarks.length > 0 && (
            <BookmarkList
              data={{ ...bookmarks, results: savedBookmarks }}
              queryParams={queryParams}
            />
          )}
        </>
      ),
      fetchData: fetchDataForYou,
    },
    'read-later': {
      content: (
        <>
          <h1>Read Later</h1>
          {!readLaterBookmarks.length && <NotFound />}
          {readLaterBookmarks.length > 0 && (
            <BookmarkList
              data={{ ...bookmarks, results: readLaterBookmarks }}
              queryParams={queryParams}
            />
          )}
        </>
      ),
      fetchData: fetchDataFollowing,
    },
    favorite: {
      content: (
        <>
          <h1>Favorites</h1>
          {!favoriteBookmarks.length && <NotFound />}
          {favoriteBookmarks.length > 0 && (
            <BookmarkList
              data={{ ...bookmarks, results: favoriteBookmarks }}
              queryParams={queryParams}
            />
          )}
        </>
      ),
      fetchData: fetchDataFollowing,
    },
    // ... other tabs
  };
  // const bookmarkPageTabs = useBookmarkPageTabs()
  const { handleScroll, contentRef, renderTabContent } = useTabContentManager(
    useBookmarkPageTabs,
    tabsConfig,
  );

  return (
    <>
      <StoriesPageHeader
        pageTitle="Bookmarks"
        showTab
        parallax
        tabStore={useBookmarkPageTabs}
      />

      <div ref={contentRef} onScroll={handleScroll} className="tab-content">
        {error && <p className="error-message">{error}</p>}

        {renderTabContent()}
        {/* {!bookmarks.results && <NotFound />}
      {bookmarks.results?.length > 0 && (
        <BookmarkList data={bookmarks} queryParams={queryParams} />
      )} */}
      </div>
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
