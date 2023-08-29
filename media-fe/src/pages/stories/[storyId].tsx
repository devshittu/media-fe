import React, { ReactElement, useMemo } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import {
  StoryList,
  StoryListLoadingPlaceholder,
} from '@/features/stories/components';
import {
  getStorylines,
  useStorylines,
} from '@/features/stories/api/get-storylines';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { Story } from '@/features/stories';
import { NotFound } from '@/components/not-found';
import { StoriesPageFrame } from '@/components/frames';
import { PaneConfig } from '@/components/blocks/side-panel/types';
import { UserSuggestionList } from '@/features/users/components';
import { TableOfContents } from '@/components/blocks/table-of-contents/';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { TimelineScrollbar } from '@/components/blocks/timeline-scroller';

type PublicStoryPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const StorylinePage = ({ stories }: PublicStoryPageProps) => {
  const router = useRouter();
  const storyId = router.query.storyId as string;
  const { data: responseData, isLoading } = useStorylines({
    storyId,
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
      <StoriesPageHeader pageTitle="Timeline" />
      {isLoading && <StoryListLoadingPlaceholder />}
      {stableStories?.length === 0 && <NotFound />}
      {stableStories?.length > 0 && (
        <StoryList
          data={stableStories}
          totalPages={responseData?.total_pages}
          scrollInfinite
        />
      )}
    </>
    // ,{ stableStories }
  );
};
StorylinePage.getLayout = function getLayout(
  page: ReactElement,
  layoutProps?: Record<string, any>,
) {
  const sidePanelSections: PaneConfig[] = [
    {
      id: 'relatedStories',
      title: 'Related Stories',
      // component: <TableOfContents data={layoutProps?.stories || []} />,
      component: <TimelineScrollbar data={layoutProps?.stories || []} />,
      showLink: false,
    },
    {
      id: 'channelSubscriptions',
      title: 'Suggestions',
      component: <UserSuggestionList />,
    },
  ];

  return (
    <UserLayout>
      <StoriesPageFrame sidePanelSections={sidePanelSections}>
        {page}
      </StoriesPageFrame>
    </UserLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const storyId = context.params?.storyId as string;
  const stories = await getStorylines({ storyId });
  return {
    props: { stories },
  };
};
export default StorylinePage;

// Path: pages/stories/[storyId]
