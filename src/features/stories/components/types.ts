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

export type LikeStoryFormData = {
  story_slug?: string;
  story_id?: number;
};

export type UseLikeStoryOptions = {
  story_id: string;
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
};

export enum StoryAction {
  LIKE = 'like',
  UNLIKE = 'unlike',
  DISLIKE = 'dislike',
  UNDISLIKE = 'undislike',
}
