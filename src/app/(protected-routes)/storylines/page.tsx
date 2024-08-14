import { ReactElement } from 'react';
import UserLayout from '@/layouts/user-layout';
import { StoriesPageHeader } from '@/components/blocks/headers';
import { StoriesPageFrame } from '@/components/frames';
import { NotFound } from '@/components/not-found';
import { getStorylines } from '@/features/storylines/api/get-storylines';
import { cleanObject } from '@/utils';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';
import { StoriesQueryParams } from '@/features/stories';
import { Storyline } from '@/features/storylines/types';
import { StorylineListClient } from './_component/StorylineListClient';

type StorylinesPageProps = {
  storylines: {
    results: Storyline[];
  };
  queryParams: StoriesQueryParams;
  error?: string;
};

export default async function StorylinesPage() {
  const queryParams: StoriesQueryParams = cleanObject({
    page: 1,
    per_page: PAGINATE_STORIES_LIMIT,
  });

  try {
    const storylines = await getStorylines({ params: queryParams });

    if (!storylines.results || storylines.results.length === 0) {
      return (
        <>
          <StoriesPageHeader pageTitle="Storylines" />
          <NotFound />
        </>
      );
    }

    return (
      <>
        <StoriesPageHeader pageTitle="Storylines" />
        <StorylineListClient storylines={storylines.results} queryParams={queryParams} />
      </>
    );
  } catch (error) {
    console.error('Error fetching storylines:', error);
    return (
      <>
        <StoriesPageHeader pageTitle="Storylines" />
        <p>There was an error fetching the storylines. Please try again later.</p>
      </>
    );
  }
}

StorylinesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      <StoriesPageFrame>{page}</StoriesPageFrame>
    </UserLayout>
  );
};
// src/app/(protected-routes)/storylines/page.tsx