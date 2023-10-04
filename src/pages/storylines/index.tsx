import { ReactElement, useMemo, useRef } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import {
  StorylineList,
  StorylineItem,
  Storyline,
} from '@/features/storylines/components';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { StoriesPageFrame } from '@/components/frames';
import { NotFound } from '@/components/not-found';
import { cleanObject } from '@/utils';
import { getStorylines } from '@/features/storylines/api/get-storylines';
import { StoriesQueryParams } from '@/features/stories';
type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const StorylinesPage = ({
  storylines,
  queryParams,
  error,
}: PublicStoriesPageProps) => {
  return (
    <>
      <StoriesPageHeader pageTitle="Home" showTab parallax />
      {error && <p className="error-message">{error}</p>}

      {/* TODO: no storylines to display */}
      {!storylines.results && <NotFound />}
      {storylines.results?.length > 0 && (
        <StorylineList data={storylines} queryParams={queryParams} />
      )}
    </>
  );
};

StorylinesPage.getLayout = function getLayout(page: ReactElement) {
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
    const storylines = await getStorylines({ params: queryParams });
    console.log('Fetched storylines:', storylines);

    // Check if the results are empty
    if (!storylines.results || storylines.results.length === 0) {
      return {
        props: {
          error: 'No storylines found.',
          storylines: {
            links: {},
            count: 0,
            total_pages: 0,
            current_page: 0,
            results: [] as Storyline[],
          },
          queryParams,
        },
      };
    }

    return {
      props: {
        storylines,
        queryParams,
      },
    };
  } catch (error) {
    console.error('Error fetching storylines in getServerSideProps:', error);

    return {
      props: {
        error:
          'There was an error fetching the storylines. Please try again later.',
        storylines: {
          links: {},
          count: 0,
          total_pages: 0,
          current_page: 0,
          results: [] as Storyline[],
        },
        queryParams,
      },
    };
  }
};

export default StorylinesPage;

//Path: src/pages/storylines/index.tsx
