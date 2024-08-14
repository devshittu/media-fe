'use client';

import { Storyline, StorylineList } from '@/features/storylines/components';
import { StoriesQueryParams } from '@/features/stories';

type StorylineListClientProps = {
  storylines: Storyline[];
  queryParams: StoriesQueryParams;
};

export const StorylineListClient = ({
  storylines,
  queryParams,
}: StorylineListClientProps) => {
  if (!storylines.length) {
    return <p>No storylines available.</p>;
  }

  return <StorylineList data={storylines} queryParams={queryParams} />;
};
