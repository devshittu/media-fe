import { ReactElement, useMemo, useRef } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import {
  StoryList,
  StoryListItemLoadingPlaceholder,
} from '@/features/stories/components';
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
  const stableStories = useMemo(
    () => storiesFromUse.data?.stories,
    [storiesFromUse.data?.stories],
  );

  console.log('storiesFromUse.data?.stories:// ', storiesFromUse.data?.stories);
  return (
    <>
      <StoriesPageHeader pageTitle="Home" showTab parallax />
      {storiesFromUse?.isLoading && (
        <>
          <StoryListItemLoadingPlaceholder />
          <StoryListItemLoadingPlaceholder />
          <StoryListItemLoadingPlaceholder />
        </>
      )}
      {stableStories?.length > 0 && (
        <StoryList
          data={stableStories}
          totalPages={storiesFromUse.data?.total_pages}
          scrollInfinite
        />
      )}
    </>
  );
};

StoriesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageContainer>{page}</StoriesPageContainer>
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
