// src/app/home-page.tsx
'use client';

import { SEO } from '@/components/seo';
import React, { ReactElement } from 'react';
import LandingLayout from '@/layouts/landing-layout';
import { Footer, Explore } from '@/components/labs/LandingPage/';
import { NotFound } from '@/components/not-found';
import { HashtaggedStoryList } from '@/features/stories/components/blocks/hashtagged-story-list';
import { Story, StoriesQueryParams } from '@/features/stories';
import logger from '@/utils/logger';

type PublicHomePageProps = {
  stories: {
    links: any;
    count: number;
    total_pages: number;
    current_page: number;
    results: Story[];
  };
  queryParams: StoriesQueryParams;
};

export default function Home({ stories, queryParams }: PublicHomePageProps) {
  const schemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: 'Home',
    description: 'Home page',
  };
  logger.info('info from home page');
  return (
    <>
      {/* <SEO
        title="Home"
        description="Home page"
        schemaOrgJSONLD={schemaOrgJSONLD}
        canonicalUrl="/"
      /> */}
      <Explore hashtag={queryParams.hashtag}>
        {!stories.results && <NotFound />}
        {stories.results?.length > 0 && (
          <>
            <HashtaggedStoryList data={stories} queryParams={queryParams} />
          </>
        )}
      </Explore>
      <Footer />
    </>
  );
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return <LandingLayout>{page}</LandingLayout>;
// };

// src/app/home-page.tsx
