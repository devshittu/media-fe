import React, { ReactElement, useEffect, useState } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';

import { getStorylines } from '@/features/stories/api/get-storylines';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { NotFound } from '@/components/not-found';
import { StoriesPageFrame } from '@/components/frames';
import { PaneConfig } from '@/components/blocks/side-panel/types';
import { UserSuggestionList } from '@/features/users/components';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { TimelineScrollbar } from '@/components/blocks/timeline-scroller';
import { StoriesQueryParams, Story } from '@/features/stories';
import { cleanObject } from '@/utils';
import { StorylineStoryList } from '@/features/stories/components/blocks/storyline-story-list';

type PublicStoryPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const StorylinePage = ({
  stories,
  storyFor,
  queryParams,
}: PublicStoryPageProps) => {
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  useEffect(() => {
    console.log('about setting setCurrentStoryId:// ', storyFor);
    setCurrentStoryId(storyFor);
  }, [storyFor]);

  useEffect(() => {
    if (currentStoryId && stories?.stories?.length > 0) {
      const element = document.getElementById(`scroll-to-${currentStoryId}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        window.scrollTo({
          top: rect.top + window.scrollY,
          behavior: 'auto',
        });
      }
    }
  }, [currentStoryId, stories.stories]);

  return (
    <>
      <StoriesPageHeader pageTitle="Timeline" />
      {!stories.stories && <NotFound />}
      {stories?.stories?.length > 0 && (
        <StorylineStoryList
          storyFor={storyFor}
          data={stories}
          queryParams={queryParams}
        />
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
  const storyFor = params?.storyId as string;
  console.log('StoryFor://', storyFor);
  try {
    const stories = await getStorylines({
      storyFor,
      params: queryParams,
    });

    // console.log('StoryID://', storyId,'storyline://',stories);
    return {
      props: {
        stories,
        storyFor,
        queryParams,
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
        storyFor,
        queryParams,
      },
    };
  }
};
export default StorylinePage;

// Path: src/pages/stories/[storyId]
