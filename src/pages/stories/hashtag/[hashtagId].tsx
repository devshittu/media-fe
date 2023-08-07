import { SidePanel } from '@/components/blocks/side-panel';
import { Toast } from '@/components/blocks/toast';
import { ReactElement, useRef } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoryList } from '@/features/stories/components';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Story, getStories, useStories } from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import {
  getStoriesByHashtag,
  useStoriesByHashtag,
} from '@/features/stories/api/get-stories-by-hashtag';
import { useRouter } from 'next/router';
import StoriesPageContainer from '@/features/stories/components/stories-page-container/stories-page-container';
type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const StoriesByHashtagPage = ({ stories }: PublicStoriesPageProps) => {
  const router = useRouter();
  const hashtagId = router.query.hashtagId as string;
  const storiesByHashtagFromUse = useStoriesByHashtag({
    params: {
      page: 1,
      per_page: PAGINATE_STORIES_LIMIT,
      hashtag: hashtagId,
    },
  });

  return (
    <>
      <StoriesPageHeader pageTitle="Home" />
      <StoryList
        data={storiesByHashtagFromUse.data?.stories}
        totalPages={storiesByHashtagFromUse.data?.total_pages}
        isLoading={storiesByHashtagFromUse.isLoading}
        // scrollInfinite
      />
    </>
  );
};

StoriesByHashtagPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageContainer>{page}</StoriesPageContainer>
    </UserLayout>
  );
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const hashtagId = params?.hashtagId as string;
  // const stories = await getAllStories().catch(() => [] as StoryItem[]);
  const stories = await getStoriesByHashtag({
    params: {
      hashtag: hashtagId,
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

export default StoriesByHashtagPage;

//Path: src/pages/stories/hashtag/[hashtagId].tsx
