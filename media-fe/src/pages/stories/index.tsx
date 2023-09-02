import { ReactElement, useMemo, useRef } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoryList } from '@/features/stories/components';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { StoriesQueryParams, Story, getStories } from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { StoriesPageFrame } from '@/components/frames';
import { NotFound } from '@/components/not-found';
import { cleanObject } from '@/utils';
type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const StoriesPage = ({ stories, queryParams }: PublicStoriesPageProps) => {
  return (
    <>
      <StoriesPageHeader pageTitle="Home" showTab parallax />

      {/* TODO: no stories to display */}
      {!stories.stories && <NotFound />}
      {stories.stories?.length > 0 && (
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

export default StoriesPage;

//Path: src/pages/stories/index.tsx
