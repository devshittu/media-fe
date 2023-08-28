import { ReactElement, useMemo } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import {
  StoryList,
  StoryListLoadingPlaceholder,
} from '@/features/stories/components';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Story, getStories, useStories } from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import {
  getStoriesByHashtag,
  useStoriesByHashtag,
} from '@/features/stories/api/get-stories-by-hashtag';
import { useRouter } from 'next/router';
import { StoriesPageFrame } from '@/components/frames';
type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const StoriesByHashtagPage = ({ stories }: PublicStoriesPageProps) => {
  const router = useRouter();
  const hashtagId = router.query.hashtagId as string;
  const { data: responseData, isLoading } = useStoriesByHashtag({
    params: {
      page: 1,
      per_page: PAGINATE_STORIES_LIMIT,
      hashtag: hashtagId,
    },
  }); // Use data and isLoading directly from the hook

  const stableHashtags = useMemo(
    () => responseData?.stories,
    [responseData?.stories],
  );

  return (
    <>
      <StoriesPageHeader pageTitle="Home" />
      {isLoading && (
        <>
          <StoryListLoadingPlaceholder />
        </>
      )}
      {stableHashtags?.length > 0 && (
        <StoryList
          data={stableHashtags}
          totalPages={responseData?.total_pages}
          // scrollInfinite
        />
      )}{' '}
    </>
  );
};

StoriesByHashtagPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageFrame>{page}</StoriesPageFrame>
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
