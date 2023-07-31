import { ReactElement, useRef } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoryList } from '@/features/stories/components';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Story, getStories, useStories } from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import StoriesPageContainer from '@/features/stories/components/stories-page-container/stories-page-container';
type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const StoriesPage = ({ stories }: PublicStoriesPageProps) => {
  const storiesFromUse = useStories({
    params: {
      page: 1,
      per_page: PAGINATE_STORIES_LIMIT,
    },
  });
  return (
    <>
        <StoriesPageHeader pageTitle="Home" showTab parallax />
          <StoryList
            data={storiesFromUse.data?.stories}
            totalPages={storiesFromUse.data?.total_pages}
            isLoading={storiesFromUse.isLoading}
            scrollInfinite
          />
      </>
  );
};

StoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout><StoriesPageContainer>{page}</StoriesPageContainer></UserLayout>;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const categoryId = params?.categoryId as string;
  // const stories = await getAllStories().catch(() => [] as StoryItem[]);
  const stories = await getStories({
    params: {
      categoryId: categoryId,
      page: 1,
      per_page: PAGINATE_STORIES_LIMIT,
    },
  }).catch(() => [] as Story[]);

  return {
    props: {
      stories,
    },
  };
};

export default StoriesPage;

//Path: src/pages/stories/index.tsx
