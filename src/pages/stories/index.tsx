import { ReactElement, useMemo } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoryList } from '@/features/stories/components';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import {
  StoriesQueryParams,
  Story,
  getStories,
  getUserFeedStories,
  useUserFeedStories,
} from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { StoriesPageFrame } from '@/components/frames';
import { NotFound } from '@/components/not-found';
import { cleanObject } from '@/utils';
import { useTabContentManager } from '@/components/blocks/tab';
import { useHomePageTabs } from '@/stores/tabs';
import { Discover } from '@/features/trends/components/discover/discover';

type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const StoriesPage = ({
  stories,
  userFeed,
  queryParams,
  error,
}: PublicStoriesPageProps) => {
  // console.log('userFeed', userFeed);

  const { data: responseData, isLoading } = useUserFeedStories({
    params: { page_size: 100 },
  }); // Use data and isLoading directly from the hook

  const stableUserFeedStories = useMemo(
    () => responseData?.results,
    [responseData?.results],
  );
  // Define asynchronous functions for each tab
  const fetchDataForYou = useMemo(
    () => async () => {
      // Async operation for the "For You" tab
      console.log('TabTest: Fetching data for you');
    },
    [],
  );
  const fetchDataDiscover = useMemo(
    () => async () => {
      // Async operation for the "Discover" tab
      console.log('TabTest: Fetching data discover');
    },
    [],
  );

  const tabsConfig = {
    discover: {
      content: (
        <>
          <Discover />
          {JSON.stringify(stableUserFeedStories?.length)}
          {!stories.results && <NotFound />}
          {stories.results?.length > 0 && (
            <StoryList data={stories} queryParams={queryParams} />
          )}
        </>
      ),
      fetchData: fetchDataDiscover,
    },
    'for-you': {
      content: (
        <>
          <h1>For You</h1>
          {!stories.results && <NotFound />}
          {stories.results?.length > 0 && (
            <StoryList data={stories} queryParams={queryParams} />
          )}
        </>
      ),
      fetchData: fetchDataForYou,
    },
    // ... other tabs
  };
  const { handleScroll, contentRef, renderTabContent } = useTabContentManager(
    useHomePageTabs,
    tabsConfig,
  );

  return (
    <>
      <StoriesPageHeader
        pageTitle="Home"
        showTab
        parallax
        tabStore={useHomePageTabs}
      />

      <div ref={contentRef} onScroll={handleScroll} className="tab-content">
        {error && <p className="error-message">{error}</p>}

        {renderTabContent()}

        {/* {!stories.results && <NotFound />}
      {stories.results?.length > 0 && (
        <StoryList data={stories} queryParams={queryParams} />
      )} */}
      </div>
    </>
  );
};

StoriesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageFrame>{page}</StoriesPageFrame>
    </UserLayout>
  );
};

export const getServerSideProps = async ({
  params,
  req,
}: GetServerSidePropsContext) => {
  const queryParams: StoriesQueryParams = cleanObject({
    page: 1,
    page_size: PAGINATE_STORIES_LIMIT,
  });
  console.log(
    'req.cookies:',
    req.cookies,
    'req.headers.cookie:',
    req.headers.cookie,
  );

  // try {
  //   const userFeed = await getUserFeedStories({ params: queryParams });
  //   const stories = await getStories({ params: queryParams });

  //   console.log('getServerSideProps: userFeed://', userFeed);
  //   // Check if the results are empty
  //   if (
  //     (!stories.results || stories.results.length === 0) &&
  //     (!userFeed.results || userFeed.results.length === 0)
  //   ) {
  //     return {
  //       props: {
  //         error: 'No stories found.',
  //         stories: {
  //           links: {},
  //           count: 0,
  //           total_pages: 0,
  //           current_page: 0,
  //           results: [] as Story[],
  //         },
  //         userFeed: {
  //           links: {},
  //           count: 0,
  //           total_pages: 0,
  //           current_page: 0,
  //           results: [] as Story[],
  //         },
  //         queryParams,
  //       },
  //     };
  //   }

  //   return {
  //     props: {
  //       stories,
  //       userFeed,
  //       queryParams,
  //     },
  //   };
  // } catch (error) {
  //   console.error('Error fetching stories in getServerSideProps:', error);

  //   return {
  //     props: {
  //       error:
  //         'There was an error fetching the stories. Please try again later.',
  //       stories: {
  //         links: {},
  //         count: 0,
  //         total_pages: 0,
  //         current_page: 0,
  //         results: [] as Story[],
  //       },
  //       userFeed: {
  //         links: {},
  //         count: 0,
  //         total_pages: 0,
  //         current_page: 0,
  //         results: [] as Story[],
  //       },
  //       queryParams,
  //     },
  //   };
  // }

  try {
    const [userFeedResponse, storiesResponse] = await Promise.all([
      getUserFeedStories({ params: queryParams }),
      getStories({ params: queryParams }),
    ]);

    // Check if the results are empty
    if (
      (!storiesResponse.results || storiesResponse.results.length === 0) &&
      (!userFeedResponse.results || userFeedResponse.results.length === 0)
    ) {
      return {
        props: {
          error: 'No stories found.',
          stories: {
            links: {},
            count: 0,
            total_pages: 0,
            current_page: 0,
            results: [] as Story[],
          },
          userFeed: {
            links: {},
            count: 0,
            total_pages: 0,
            current_page: 0,
            results: [] as Story[],
          },
          queryParams,
        },
      };
    }

    return {
      props: {
        stories: storiesResponse,
        userFeed: userFeedResponse,
        queryParams,
      },
    };
  } catch (error) {
    console.error('Error fetching stories in getServerSideProps:', error);
    return {
      props: {
        error:
          'There was an error fetching the stories. Please try again later.',
        stories: {
          links: {},
          count: 0,
          total_pages: 0,
          current_page: 0,
          results: [] as Story[],
        },
        userFeed: {
          links: {},
          count: 0,
          total_pages: 0,
          current_page: 0,
          results: [] as Story[],
        },
        queryParams,
      },
    };
  }
};

export default StoriesPage;

//Path: src/pages/stories/index.tsx
