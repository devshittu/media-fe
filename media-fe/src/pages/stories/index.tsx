import { ReactElement, useMemo, useRef } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import {
  StoryList,
  StoryListLoadingPlaceholder,
} from '@/features/stories/components';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Story, getStories, useStories } from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { StoriesPageFrame } from '@/components/frames';
type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const StoriesPage = ({ stories }: PublicStoriesPageProps) => {
  const { data: responseData, isLoading } = useStories({
    params: {
      page: 1,
      per_page: PAGINATE_STORIES_LIMIT,
    },
  });
  const stableStories = useMemo(
    () => responseData?.stories,
    [responseData?.stories],
  );

  return (
    <>
      <StoriesPageHeader pageTitle="Home" showTab parallax />
      {isLoading && (
        <>
          <StoryListLoadingPlaceholder />
        </>
      )}
      {stableStories?.length > 0 && (
        <StoryList
          data={stableStories}
          totalPages={responseData?.total_pages}
          scrollInfinite
        />
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
  const category_id = params?.category_id as string;
  const stories = await getStories({
    params: {
      category_id: category_id,
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