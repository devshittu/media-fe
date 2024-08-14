import { StoriesPageHeader } from '@/components/blocks/headers';
import UserLayout from '@/layouts/user-layout';
import React, { ReactElement } from 'react';
import {
  Bookmark,
  BookmarkCategory,
  BookmarksQueryParams,
  getBookmarks,
  useInfiniteBookmarks,
} from '@/features/bookmarks';
import { BookmarkList } from '@/features/bookmarks/components';
import { StoriesPageFrame } from '@/components/frames';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { cleanObject } from '@/utils';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
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
          <BookmarkList
            useBookmarksHook={useInfiniteBookmarks}
            queryParams={{ ...queryParams, category: BookmarkCategory.Save }}
            loadMoreOnScroll
          />
        </>
      ),
      fetchData: fetchDataForYou,
    },
    'read-later': {
      content: (
        <>
          <BookmarkList
            useBookmarksHook={useInfiniteBookmarks}
            // data={{ ...bookmarks, results: readLaterBookmarks }}
            queryParams={{
              ...queryParams,
              category: BookmarkCategory.ReadLater,
            }}
            loadMoreOnScroll
          />
        </>
      ),
      fetchData: fetchDataFollowing,
    },
    favorite: {
      content: (
        <>
          <BookmarkList
            useBookmarksHook={useInfiniteBookmarks}
            // data={{ ...bookmarks, results: favoriteBookmarks }}
            queryParams={{
              ...queryParams,
              category: BookmarkCategory.Favorites,
            }}
            loadMoreOnScroll
          />
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
        {/* {error && <p className="error-message">{error}</p>} */}
        {renderTabContent()}
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
  const queryParams: BookmarksQueryParams = cleanObject({
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
