import { ReactElement, useMemo, useRef } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoryList } from '@/features/stories/components';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import {
  StoriesQueryParams,
  Story,
  getStories,
  useStories,
} from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { StoriesPageFrame } from '@/components/frames';
import { NotFound } from '@/components/not-found';
import { cleanObject } from '@/utils';
type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const StoriesPage = ({
  stories,
  queryParams,
  error,
}: PublicStoriesPageProps) => {
  return (
    <>
      <StoriesPageHeader pageTitle="Home" showTab parallax />
      {error && <p className="error-message">{error}</p>}

      {/* TODO: no stories to display */}
      {!stories.results && <NotFound />}
      {stories.results?.length > 0 && (
        <StoryList data={stories} queryParams={queryParams} />
      )}
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
}: GetServerSidePropsContext) => {
  const queryParams: StoriesQueryParams = cleanObject({
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
  });

  try {
    const stories = await getStories({ params: queryParams });
    console.log('Fetched stories:', stories);

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

export default StoriesPage;

//Path: src/pages/stories/index.tsx
