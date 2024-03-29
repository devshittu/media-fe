import {
  StoriesQueryParams,
  Story,
  StoryListResponse,
} from '../../stories/types';

export type StoryListProps = {
  data: StoryListResponse;
  queryParams: StoriesQueryParams;
};
export type StorylineStoryListProps = StoryListProps & {
  storyFor: string;
};

export type StorylineMiniCardProps = {
  story: Story;
  identifier?: string;
};
