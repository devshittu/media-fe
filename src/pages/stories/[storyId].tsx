import React, { ReactElement, useEffect, useState } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';

import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { NotFound } from '@/components/not-found';
import { StoriesPageFrame } from '@/components/frames';
import { PaneConfig } from '@/components/blocks/side-panel/types';
import { UserSuggestionList } from '@/features/users/components';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { TimelineScrollbar } from '@/components/blocks/timeline-scroller';
import { StoriesQueryParams, Story, StoryListItem, getStory } from '@/features/stories';
import { cleanObject } from '@/utils';

type PublicStoryPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const StorylinePage = ({
  stories,
  storyId,
  queryParams,
}: PublicStoryPageProps) => {

  return (
    <>
      <StoriesPageHeader pageTitle="Timeline" />
      {!stories && <NotFound />}
      {stories && (
        <>
        <StoryListItem story={stories} />
        </>
      )}
    </>
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

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const queryParams: StoriesQueryParams = cleanObject({
    // category_id: params?.category_id as string,
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
    // story_id: params?.storyId as string
  });
  const storyId = params?.storyId as string;
  console.log('StoryFor://', storyId);
  try {
    const stories = await getStory({
      storyId,
      // params: queryParams,
    });

    return {
      props: {
        stories,
        storyId,
        queryParams,
      },
    };
  } catch (error) {
    return {
      props: {
        stories: {} as Story,
        storyId,
        queryParams,
      },
    };
  }
};
export default StorylinePage;

// Path: src/pages/stories/[storyId]
