import { Seo } from '@/components/seo';
import React, { ReactElement, useMemo } from 'react';
import LandingLayout from '@/layouts/landing-layout';
import { Footer, Explore } from '@/components/labs/LandingPage/';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { StoriesQueryParams, Story, getStories } from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { cleanObject } from '@/utils';
import { Category, getCategories } from '@/features/categories';
import { NotFound } from '@/components/not-found';
import { HashtaggedStoryList } from '@/features/stories/components/blocks/hashtagged-story-list';

type PublicHomePageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
export default function Home({
  stories,
  hashtag,
  categories,
  queryParams,
}: PublicHomePageProps) {
  return (
    <>
      <Seo title="Home" />
      <Explore hashtag={hashtag}>
        {!stories.stories && <NotFound />}
        {stories.stories?.length > 0 && (
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
    const stories = await getStories({ params: queryParams });
    const categories = await getCategories({});

    return {
      props: {
        stories,
        hashtag,
        categories,
        queryParams, // Pass queryParams as a prop
      },
    };
  } catch (error) {
    return {
      props: {
        stories: {
          stories: [] as Story[],
          page: 1,
          total_pages: 0,
          total: 0,
        },
        hashtag,
        categories: [] as Category[],
        queryParams, // Pass queryParams as a prop
      },
    };
  }
};
