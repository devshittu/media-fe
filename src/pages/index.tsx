import { Seo } from '@/components/seo';
import React, { ReactElement, useMemo } from 'react';
import LandingLayout from '@/layouts/landing-layout';
import { Footer, Explore } from '@/components/labs/LandingPage/';
import { getCategories } from '@/testing/test-data';
import { StoryItem } from '@/testing';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import {
  StoryList,
  StoryListLoadingPlaceholder,
  useStoriesByHashtag,
} from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';

type PublicHomePageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
export default function Home({ categories }: PublicHomePageProps) {
  const hashtag = 'Deforestation';
  const { data: responseData, isLoading } = useStoriesByHashtag({
    params: {
      page: 1,
      per_page: PAGINATE_STORIES_LIMIT,
      hashtag,
    },
  });

  const stableStories = useMemo(
    () => responseData?.stories,
    [responseData?.stories],
  );
  return (
    <>
      <Seo title="Home" />
      <Explore hashtag={hashtag}>
        {isLoading && (
          <>
            <StoryListLoadingPlaceholder />
          </>
        )}
        {stableStories?.length > 0 && (
          <StoryList
            data={stableStories}
            totalPages={responseData?.total_pages}
            // scrollInfinite
          />
        )}
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
  const categories = await getCategories().catch(() => [] as StoryItem[]);
  return {
    props: {
      // stories,
      categories,
    },
  };
};
