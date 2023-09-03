import { StoriesQueryParams, Story, StoryResponse } from '../types';

export type StoryListItemProps = {
  story: Story;
  className?: string;
  categories: Record<string, { title: string; slug: string }>;
};
export type StoryListProps = {
  data: StoryResponse;
  queryParams: StoriesQueryParams;
};
export type StorylineStoryListProps = StoryListProps & {
  storyFor: string;
};
