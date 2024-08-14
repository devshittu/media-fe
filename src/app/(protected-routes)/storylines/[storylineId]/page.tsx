import { ReactElement } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { StoriesPageFrame } from '@/components/frames';
import { PaneConfig } from '@/components/blocks/side-panel/types';
import { UserSuggestionList } from '@/features/users/components';
import { StoriesQueryParams, Story } from '@/features/stories';
import { cleanObject } from '@/utils';
import { getStoryline } from '@/features/storylines/api/get-storyline';
import { getStorylineStories } from '@/features/storylines/api/get-storyline-stories';
import { StorylinePane } from '@/features/storylines/components/';
import { getStorylineHashtags } from '@/features/storylines/api/get-storyline-hashtags';
import { Hashtag } from '@/features/hashtags';
import ClientStorylinePage from '../_component/ClientStorylinePage';

type StorylinePageProps = {
  error: string | null;
  storyline: any; // Use the correct type here
  storylineStories: Story[];
  storylineHashtags: Hashtag[];
  storylineId: string;
  queryParams: StoriesQueryParams;
};

export default async function StorylinePage({
  params,
}: {
  params: { storylineId: string };
}) {
  const queryParams: StoriesQueryParams = cleanObject({
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
  });

  const storylineId = params.storylineId;

  try {
    const storyline = await getStoryline({ storylineId, params: queryParams });
    const storylineStories = await getStorylineStories({
      params: queryParams,
    });
    const storylineHashtags = await getStorylineHashtags({
      storylineId,
      params: { ...queryParams, page_size: 30 },
    });

    return (
      <ClientStorylinePage
        error={null}
        storyline={storyline}
        queryParams={queryParams}
        storylineId={storylineId}
        storylineStories={storylineStories.results}
        storylineHashtags={storylineHashtags.results}
      />
    );
  } catch (error) {
    console.error('Error fetching storylines:', error);

    return (
      <ClientStorylinePage
        error="There was an error fetching the storylines. Please try again later."
        storyline={{}}
        queryParams={queryParams}
        storylineId={storylineId}
        storylineStories={[]}
        storylineHashtags={[]}
      />
    );
  }
}

StorylinePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageFrame>{page}</StoriesPageFrame>
    </UserLayout>
  );
};
// src/app/(protected-routes)/storylines/[storylineId]/page.tsx