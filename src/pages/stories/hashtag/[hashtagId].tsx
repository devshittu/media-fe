import { ReactElement, useMemo } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { StoriesQueryParams, Story } from '@/features/stories';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { getStoriesByHashtag } from '@/features/stories/api/get-stories-by-hashtag';
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
  error,
}: PublicStoriesPageProps) => {
  return (
    <>
      <StoriesPageHeader pageTitle={`#${queryParams.hashtag}`} />
      {error && <p className="error-message">{error}</p>}
      {/* TODO: no stories to display */}
      {!stories.results && <NotFound />}
      {stories.results?.length > 0 && (
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

export default StoriesByHashtagPage;

//Path: src/pages/stories/hashtag/[hashtagId].tsx
