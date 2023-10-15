import { Seo } from '@/components/seo';
import React, { ReactElement, useMemo } from 'react';
import LandingLayout from '@/layouts/landing-layout';
import { Footer, Explore } from '@/components/labs/LandingPage/';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import {
  StoriesQueryParams,
  Story,
  getStories,
  getStoriesByHashtag,
} from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { cleanObject } from '@/utils';
import { Category, getCategories } from '@/features/categories';
import { NotFound } from '@/components/not-found';
import { HashtaggedStoryList } from '@/features/stories/components/blocks/hashtagged-story-list';

type PublicHomePageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
export default function Home({ stories, queryParams }: PublicHomePageProps) {
  return (
    <>
      <Seo title="Home" />
      <Explore hashtag={queryParams.hashtag}>
        {!stories.results && <NotFound />}
        {stories.results?.length > 0 && (
          <HashtaggedStoryList data={stories} queryParams={queryParams} />
        )}{' '}
      </Explore>

      <Footer />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const hashtag = 'Deforestation'; //TODO: add at random.
  const queryParams: StoriesQueryParams = cleanObject({
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
    hashtag,
  });

  try {
    const stories = await getStoriesByHashtag({ params: queryParams });
    // const categories = await getCategories({});

    // Check if the results are empty
    if (!stories.results || stories.results.length === 0) {
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
          queryParams,
        },
      };
    }

    return {
      props: {
        stories,
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
        queryParams,
      },
    };
  }
};

// Path: src/pages/index.tsx
