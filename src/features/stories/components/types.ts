import { StoriesQueryParams, Story, StoryListResponse } from '../types';

export type StoryListItemProps = {
  story: Story;
  className?: string;
};
export type StoryListProps = {
  data: StoryListResponse;
  queryParams: StoriesQueryParams;
};
export type StorylineStoryListProps = StoryListProps & {
  storylineFor: string;
};
