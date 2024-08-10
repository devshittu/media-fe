// import { ReactElement } from 'react';
// import { StoriesPageHeader } from '@/components/blocks/headers';
// import { StoryList } from '@/features/stories/components';
// import {
//   StoriesQueryParams,
//   Story,
//   getStories,
//   getUserFeedStories,
//   useInfiniteUserFeedStories,
// } from '@/features/stories';
// import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
// import { StoriesPageFrame } from '@/components/frames';
// import { cleanObject } from '@/utils';
// import { useTabContentManager } from '@/components/blocks/tab';
// import { useHomePageTabs } from '@/stores/tabs';
// import { Discover } from '@/features/trends/components/discover/discover';
// import { SEO } from '@/components';
// import { useInfiniteUserInvertedFeedStories } from '@/features/stories/api/get-user-inverse-feed-stories';

// import { auth } from '@/auth';

// type PublicStoriesPageProps = {
//   stories: Story[];
//   userFeed: Story[];
//   queryParams: StoriesQueryParams;
//   error?: string;
// };

// const fetchInitialData = async (): Promise<PublicStoriesPageProps> => {
//   const queryParams: StoriesQueryParams = cleanObject({
//     page: 1,
//     page_size: PAGINATE_STORIES_LIMIT,
//   });

//   try {
//     const [userFeedResponse, storiesResponse] = await Promise.all([
//       getUserFeedStories({ params: queryParams }),
//       getStories({ params: queryParams }),
//     ]);

//     return {
//       stories: storiesResponse.results,
//       userFeed: userFeedResponse.results,
//       queryParams,
//     };
//   } catch (error) {
//     console.error('Error fetching stories:', error);
//     return {
//       stories: [],
//       userFeed: [],
//       queryParams,
//       error: 'There was an error fetching the stories. Please try again later.',
//     };
//   }
// };

// export default async function StoriesPage() {
//   const session = await auth();
//   console.log('session (server side)', session);

//   // example usage
//   // const { stories, userFeed, queryParams, error } = await fetchInitialData();

//   const schemaOrgJSONLD = {
//     '@context': 'http://schema.org',
//     '@type': 'NewsArticle',
//     headline: 'Home',
//     description: 'Home page',
//   };

//   const fetchDataForYou =
//     () => async () => {
//       // Placeholder for async operation for the "For You" tab
//     }
//   const fetchDataDiscover = //useMemo(
//     () => async () => {
//       // Placeholder for async operation for the "Discover" tab
//     };
//   //   [],
//   // );

//   const tabsConfig = {
//     discover: {
//       content: (
//         <>
//           <Discover />
//           <StoryList
//             useStoriesHook={useInfiniteUserInvertedFeedStories}
//             queryParams={{ page: 1, page_size: 3 }}
//             isFinite
//           />
//         </>
//       ),
//       fetchData: fetchDataDiscover,
//     },
//     'for-you': {
//       content: (
//         <>
//           <StoryList
//             useStoriesHook={useInfiniteUserFeedStories}
//             queryParams={queryParams}
//             loadMoreOnScroll
//           />
//         </>
//       ),
//       fetchData: fetchDataForYou,
//     },
//   };

//   const { handleScroll, contentRef, renderTabContent } = useTabContentManager(
//     useHomePageTabs,
//     tabsConfig,
//   );

//   return (
//     <>
//       <h1> Home page</h1>
//       {JSON.stringify(session)}
//       <SEO
//         title="Stories"
//         description="Stories page"
//         schemaOrgJSONLD={schemaOrgJSONLD}
//         canonicalUrl={'/stories'}
//       />
//       <StoriesPageHeader
//         pageTitle="Home"
//         showTab
//         parallax
//         tabStore={useHomePageTabs}
//       />

//       <div ref={contentRef} onScroll={handleScroll} className="tab-content">
//         {error && <p className="error-message">{error}</p>}

//         {renderTabContent()}
//       </div>
//     </>
//   );
// }


import { ReactElement } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoriesPageFrame } from '@/components/frames';
import { SEO } from '@/components';
import { Story, getStories, getUserFeedStories } from '@/features/stories';
import { cleanObject } from '@/utils';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import ClientStoriesContent from './ClientStoriesContent'; // Import Client Component
import { useHomePageTabs } from '@/stores/tabs';

type StoriesPageProps = {
  stories: Story[];
  userFeed: Story[];
  error?: string;
};

export default async function StoriesPage() {
  const queryParams = cleanObject({
    page: 1,
    page_size: PAGINATE_STORIES_LIMIT,
  });

  try {
    const [userFeedResponse, storiesResponse] = await Promise.all([
      getUserFeedStories({ params: queryParams }),
      getStories({ params: queryParams }),
    ]);

    const props: StoriesPageProps = {
      stories: storiesResponse.results || [],
      userFeed: userFeedResponse.results || [],
    };

    return (
      <>
        <SEO
          title="Stories"
          description="Stories page"
          schemaOrgJSONLD={{
            '@context': 'http://schema.org',
            '@type': 'NewsArticle',
            headline: 'Home',
            description: 'Home page',
          }}
          canonicalUrl={'/stories'}
        />
        <StoriesPageHeader
          pageTitle="Home"
          showTab
          parallax
          tabStore={useHomePageTabs}
        />
        <ClientStoriesContent {...props} />
      </>
    );
  } catch (error) {
    console.error('Error fetching stories:', error);
    return (
      <div>
        <p>There was an error fetching the stories. Please try again later.</p>
      </div>
    );
  }
}

// StoriesPage.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <UserLayout>
//       <StoriesPageFrame>{page}</StoriesPageFrame>
//     </UserLayout>
//   );
// };
