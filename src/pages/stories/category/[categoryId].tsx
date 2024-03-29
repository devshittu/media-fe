import { ReactElement } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { StoriesQueryParams, Story, StoryList } from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { StoriesPageFrame } from '@/components/frames';
import { cleanObject } from '@/utils';
import { NotFound } from '@/components/not-found';
import { CategorizedStoryList } from '@/features/stories/components/blocks/categorised-story-list';
import {
  getStoriesByCategory,
  useInfiniteStoriesByCategory,
} from '@/features/stories/api/get-stories-by-category';
type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const StoriesByCategoryPage = ({
  stories,
  queryParams,
}: PublicStoriesPageProps) => {
  return (
    <>
      <StoriesPageHeader pageTitle={`:${queryParams.categoryId}`} />

      <StoryList
        useStoriesHook={useInfiniteStoriesByCategory}
        queryParams={{ page: 1, page_size: 10 }}
        loadMoreOnScroll
      />
    </>
  );
};

StoriesByCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageFrame>{page}</StoriesPageFrame>
    </UserLayout>
  );
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const categoryId = params?.categoryId as string;
  const queryParams: StoriesQueryParams = cleanObject({
    categoryId,
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
  });
  console.log('queryParams://', queryParams);

  try {
    const stories = await getStoriesByCategory({ params: queryParams });

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

export default StoriesByCategoryPage;

//Path:  src/pages/stories/category/[categoryId].tsx
