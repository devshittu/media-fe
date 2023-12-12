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
import { StoriesQueryParams, Story, StoryList } from '@/features/stories';
import { cleanObject } from '@/utils';
import { getStoryline } from '@/features/storylines/api/get-storyline';
import { getStorylineStories } from '@/features/storylines/api/get-storyline-stories';
import { StorylinePane } from '@/features/storylines/components/';
import { getStorylineHashtags } from '@/features/storylines/api/get-storyline-hashtags';
import { Hashtag } from '@/features/hashtags';

type PublicStoryPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const StorylinePage = ({
  error,
  storyline,
  storylineStories,
  storylineHashtags,
  storylineId,
  queryParams,
}: PublicStoryPageProps) => {
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  useEffect(() => {
    console.log('about setting setCurrentStoryId:// ', storylineId);
    setCurrentStoryId(storylineId);
  }, [storylineId]);

  useEffect(() => {
    if (currentStoryId && storylineStories?.results?.length > 0) {
      const element = document.getElementById(`scroll-to-${currentStoryId}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        window.scrollTo({
          top: rect.top + window.scrollY,
          behavior: 'auto',
        });
      }
    }
  }, [currentStoryId, storyline]);

  return (
    <>
      <StoriesPageHeader pageTitle="Storyline" />

      {/* TODO: no stories to display */}
      {!storylineStories.results && <NotFound />}
      {storylineStories.results?.length > 0 && (
        <StoryList data={storylineStories} queryParams={queryParams} />
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
      id: 'timelineMetadata',
      title: layoutProps?.storyline?.summary || 'Timeline',
      showLink: false,
      component: (
        <StorylinePane
          storyline={layoutProps?.storyline}
          hashtags={layoutProps?.storylineHashtags.results}
        />
      ),
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
    // storylineId: params?.storylineId as string
    // story_id: params?.storyId as string
  });
  const storylineId = params?.storylineId as string;
  console.log('storylineId://', storylineId);

  try {
    const storylineObj = await getStoryline({
      storylineId,
      params: queryParams,
    });
    const storylineStories = await getStorylineStories({
      storylineId,
      params: queryParams,
    });

    const storylineHashtags = await getStorylineHashtags({
      storylineId,
      params: { ...queryParams, page_size: 30 },
    });

    console.log(
      `Fetched storylines for storylineId (${storylineId}):`,
      storylineObj,
    );

    // Check if the results are empty
    if (!storylineStories.results || storylineStories.results.length === 0) {
      return {
        props: {
          error: 'No storylines found.',
          storyline: {},
          storylineStories: {
            links: {},
            count: 0,
            total_pages: 0,
            current_page: 0,
            results: [] as Story[],
          },
          storylineHashtags: {
            links: {},
            count: 0,
            total_pages: 0,
            current_page: 0,
            results: [] as Hashtag[],
          },
          queryParams,
          storylineId,
        },
      };
    }

    return {
      props: {
        error: null,
        storyline: storylineObj,
        queryParams,
        storylineId,
        storylineStories,
        storylineHashtags,
      },
    };
  } catch (error) {
    console.error('Error fetching storylines in getServerSideProps:', error);

    return {
      props: {
        error:
          'There was an error fetching the storylines. Please try again later.',
        storyline: {},
        storylineStories: {
          links: {},
          count: 0,
          total_pages: 0,
          current_page: 0,
          results: [] as Story[],
        },
        storylineHashtags: {
          links: {},
          count: 0,
          total_pages: 0,
          current_page: 0,
          results: [] as Hashtag[],
        },
        storylineId,
        queryParams,
      },
    };
  }
};
export default StorylinePage;

// Path: src/pages/stories/[storyId]
