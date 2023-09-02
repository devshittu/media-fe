import { ReactElement } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { StoriesQueryParams, Story } from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { StoriesPageFrame } from '@/components/frames';
import { cleanObject } from '@/utils';
import { NotFound } from '@/components/not-found';
import { CategorizedStoryList } from '@/features/stories/components/blocks/categorised-story-list';
import { getStoriesByCategory } from '@/features/stories/api/get-stories-by-category';
type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const StoriesByCategoryPage = ({
  stories,
  queryParams,
}: PublicStoriesPageProps) => {
  console.log('StoriesByCategoryPage:// ', stories, queryParams);
  return (
    <>
      <StoriesPageHeader pageTitle={`#${queryParams.categoryId}`} />
      {/* TODO: no stories to display */}
      {!stories.stories && <NotFound />}
      {stories.stories?.length > 0 && (
        <CategorizedStoryList data={stories} queryParams={queryParams} />
      )}{' '}
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
  try {
    const stories = await getStoriesByCategory({ params: queryParams });

    return {
      props: {
        stories,
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
        queryParams, // Pass queryParams as a prop
      },
    };
  }
};

export default StoriesByCategoryPage;

//Path:  src/pages/stories/category/[categoryId].tsx
