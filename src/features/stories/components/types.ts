import { PaginatedListQueryParams, PaginatedResponse } from '@/types';
import { StoriesQueryParams, Story, StoryListResponse } from '../types';

export type StoryListItemProps = {
  story: Story;
  className?: string;
};

export type StoryListProps = {
  queryKey: any[];
  fetchMoreFunction: (params: GetStoriesOptions) => Promise<StoryListResponse>;
  data: StoryListResponse;
  queryParams: StoriesQueryParams;
};

export type StorylineStoryListProps = StoryListProps & {
  storylineFor: string;
};
export type GetStoriesOptions = {
  params?: StoriesQueryParams;
  initialData?: any;
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

enum MultimediaItemType {
  PHOTO = 'photo',
  VIDEO = 'video',
  AUDIO = 'audio',
  GIF = 'gif',
}

export type MultimediaItem = {
  file: string | null;
  media_url: string;
  caption: string;
  thumbnail: string | null;
  media_type: MultimediaItemType;
  id: number;
  user: number;
  story: number;
};

type Multimedia = MultimediaItem[];

// Path: src/features/stories/components/types.ts
