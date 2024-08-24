// src/app/stories/[storyId]/page.tsx

import { ReactElement } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { NotFound } from '@/components/not-found';
import { StoriesPageFrame } from '@/components/frames';
import { PaneConfig } from '@/components/blocks/side-panel/types';
import { UserSuggestionList } from '@/features/users/components';
import { TimelineScrollbar } from '@/components/blocks/timeline-scroller';
import { getStory, Story, StoryListItem } from '@/features/stories';
// import { getStory } from '@/features/stories/api'; // Adjust import path accordingly
import { cleanObject } from '@/utils';
import { Metadata } from 'next';
import { ApiCallResultType } from '@/types';

type StorylinePageProps = {
  stories: Story | null;
  storyId: string;
};

// This function will be called at build time
export async function generateMetadata({
  params,
}: {
  params: { storyId: string };
}): Promise<Metadata> {
  const storyId = params.storyId;
  return {
    title: `Story ${storyId} | Media App`,
    description: `View the details for story ${storyId}`,
  };
}

// Server component fetching the story data
export default async function StorylinePage({ params }: { params: { storyId: string } }) {
  const storyId = params.storyId;
  const queryParams = cleanObject({
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
  });

  let stories: Story | null = null;
  try {
    stories = await getStory({ storyId });
  } catch (error) {
    // Handle the error appropriately (log it, notify, etc.)
  }

  return (
    <>
      <StoriesPageHeader pageTitle="Timeline" />
      {!stories ? <NotFound /> : <StoryListItem cacheRefQueryKey={[storyId,ApiCallResultType.DISCRETE]} story={stories} />}
    </>
  );
}

// Add layout for the page
StorylinePage.getLayout = function getLayout(page: ReactElement) {
  const sidePanelSections: PaneConfig[] = [
    {
      id: 'relatedStories',
      title: 'Related Stories',
      component: <TimelineScrollbar data={[]} />, // Adjust as necessary
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