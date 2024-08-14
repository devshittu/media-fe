// src/app/page.tsx
import Home from './home-page';
import { cleanObject } from '@/utils';
import { StoriesQueryParams, getStoriesByHashtag } from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { Metadata } from 'next';
import LandingLayout from '@/layouts/landing-layout';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to the Home page',
};

async function fetchStories() {
  const hashtag = 'FiscalManagement'; // TODO: Add at random.
  const queryParams: StoriesQueryParams = cleanObject({
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
    hashtag,
  });

  try {
    const stories = await getStoriesByHashtag({ params: queryParams });
    return { stories, queryParams };
  } catch (error) {
    console.error('Error fetching stories in getServerSideProps:', error);
    return {
      stories: {
        links: {},
        count: 0,
        total_pages: 0,
        current_page: 0,
        results: [],
      },
      queryParams,
      error: 'There was an error fetching the stories. Please try again later.',
    };
  }
}

export default async function Page() {
  const { stories, queryParams } = await fetchStories();
  return (
    <>
      <LandingLayout>
        <Home stories={stories} queryParams={queryParams} />
      </LandingLayout>
    </>
  );
}

// Page.getLayout = function getLayout(page: ReactElement) {
//   return <LandingLayout>{page}</LandingLayout>;
// };

// src/app/page.tsx

// import { ReactElement } from 'react';
// import LandingLayout from '@/layouts/landing-layout';
// import { SEO } from '@/components/seo';
// import { Footer, Explore } from '@/components/labs/LandingPage/';
// import { NotFound } from '@/components/not-found';
// import { HashtaggedStoryList } from '@/features/stories/components/blocks/hashtagged-story-list';
// import { getStoriesByHashtag, StoriesQueryParams, Story } from '@/features/stories';
// import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
// import { cleanObject } from '@/utils';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'About',
// }

// type PublicHomePageProps = {
//   stories: { results: Story[] };
//   queryParams: StoriesQueryParams;
// };

// async function fetchStories() {
//   const hashtag = 'FiscalManagement';
//   const queryParams: StoriesQueryParams = cleanObject({
//     page: 1,
//     per_page: PAGINATE_STORIES_LIMIT,
//     hashtag,
//   });

//   try {
//     const stories = await getStoriesByHashtag({ params: queryParams });
//     return { stories, queryParams };
//   } catch (error) {
//     console.error('Error fetching stories:', error);
//     return {
//       stories: {
//         results: [],
//       },
//       queryParams,
//     };
//   }
// }

// export default async function Page() {
//   const { stories, queryParams } = await fetchStories();
//   return (
//     <>
//       {/* <SEO
//         title="Home"
//         description="Home page"
//         schemaOrgJSONLD={{
//           '@context': 'http://schema.org',
//           '@type': 'NewsArticle',
//           headline: 'Home',
//           description: 'Home page',
//         }}
//         canonicalUrl="/"
//       /> */}
//       <Explore hashtag={queryParams.hashtag}>
//         {!stories.results.length && <NotFound />}
//         {stories.results.length > 0 && (
//           <HashtaggedStoryList data={stories} queryParams={queryParams} />
//         )}
//       </Explore>
//       <Footer />
//     </>
//   );
// }

// Page.getLayout = function getLayout(page: ReactElement) {
//   return <LandingLayout>{page}</LandingLayout>;
// };

// src/app/page.tsx
