import { ReactElement } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoriesPageFrame } from '@/components/frames';
import { Bookmark, BookmarkCategory, BookmarkListResponse, getBookmarks } from '@/features/bookmarks';
import { cleanObject } from '@/utils';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import BookmarkContent from './_components/BookmarkContent';
import { useBookmarkPageTabs } from '@/stores/tabs';
import { getStories } from '@/features/stories';

type BookmarksPageProps = {
  bookmarks: Bookmark[];
  queryParams: Record<string, any>;
  error?: string;
};

export default async function BookmarksPage() {
  const queryParams = cleanObject({
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
  });

  try {

    console.log(`bookmarks: queryParams`, queryParams);
    const [
      // bookmarks, 
      storiesResponse
    ] = await  Promise.all([
      // getBookmarks({ params: queryParams }),
      getStories({ params: queryParams }),
    ]);
    const bookmarks = {} as BookmarkListResponse;
    console.log(`storiesResponse:// `,storiesResponse)

    console.log(`bookmarks: `, bookmarks);

    // if (!bookmarks.results || bookmarks.results.length === 0) {
    //   return (
    //     <div>
    //       <p>No bookmarks found.</p>
    //     </div>
    //   );
    // }

    return (
      <>
        <StoriesPageHeader
          pageTitle="Bookmarks"
          showTab
          parallax
          tabStore={useBookmarkPageTabs}
        />
        <BookmarkContent bookmarks={bookmarks.results} queryParams={queryParams} />
      </>
    );
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return (
      <>
      <div>
        <StoriesPageHeader
          pageTitle="Bookmarks"
          showTab
          parallax
          tabStore={useBookmarkPageTabs}
        />
        <BookmarkContent bookmarks={[]} queryParams={queryParams} />
      
        <p>There was an error fetching the bookmarks. Please try again later.</p>
      </div></>
    );
  }
}

// BookmarksPage.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <UserLayout>
//       <StoriesPageFrame>{page}</StoriesPageFrame>
//     </UserLayout>
//   );
// };
