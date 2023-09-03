import { ReactElement, useMemo } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import {
  StoriesQueryParams,
  Story,
} from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import {
  getStoriesByHashtag,
} from '@/features/stories/api/get-stories-by-hashtag';
import { StoriesPageFrame } from '@/components/frames';
import { cleanObject } from '@/utils';
import { NotFound } from '@/components/not-found';
import { HashtaggedStoryList } from '@/features/stories/components/blocks/hashtagged-story-list';
type PublicStoriesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const StoriesByHashtagPage = ({
  stories,
  queryParams,
}: PublicStoriesPageProps) => {
  return (
    <>
      <StoriesPageHeader pageTitle={`#${queryParams.hashtag}`} />
      {/* TODO: no stories to display */}
      {!stories.stories && <NotFound />}
      {stories.stories?.length > 0 && (
        <HashtaggedStoryList data={stories} queryParams={queryParams} />
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

  const queryParams: StoriesQueryParams = cleanObject({
    hashtag: hashtagId,
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
  });
  try {
    const stories = await getStoriesByHashtag({ params: queryParams });
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

export default StoriesByHashtagPage;

//Path: src/pages/stories/hashtag/[hashtagId].tsx
