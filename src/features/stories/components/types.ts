import {
  CacheRefType,
  PaginatedListQueryParams,
  PaginatedResponse,
} from '@/types';
import {

  PaginatedStoryListResponse,
  StoriesQueryParams,
  Story,
  StoryListResponse,
} from '../types';
import { InfiniteData, QueryKey } from '@tanstack/react-query';

export type StoryListItemProps = {
  story: Story;
  className?: string;
  cacheRefQueryKey: CacheRefType;
};

export type StoryListProps = {
  cacheRefQueryKey?: CacheRefType;
  queryParams: StoriesQueryParams;
  isFinite?: boolean;
  currentStoryId?: string;
  loadMoreOnScroll?: boolean;
  useStoriesHook: (options: GetStoriesOptions) => InfiniteStoriesResponse;
};

export type StoryStatsProps = {
  story: Story;
  cacheRefQueryKey: CacheRefType;
};

export type StorylineStoryListProps = StoryListProps & {
  storylineFor: string;
};
export type GetStoriesOptions = {
  params?: StoriesQueryParams;
  initialData?: any;
};

export type InfiniteStoriesResponse = {
  queryKey: CacheRefType;
  data: InfiniteData<StoryListResponse> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  count: number;
  error?: Error | null;
  refetch?: () => void;
};
export type LikeStoryFormData = {
  story_slug?: string;
  story_id: number;
};

export type UseLikeStoryOptions = {
  story_id: string;
  cacheRefQueryKey: CacheRefType;
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
};

export enum StoryAction {
  LIKE = 'like',
  UNLIKE = 'unlike',
  DISLIKE = 'dislike',
  UNDISLIKE = 'undislike',
  ADD_BOOKMARK = 'add-bookmark',
  DELETE_BOOKMARK = 'delete-bookmark',
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
  id: string;
  user: number;
  story: number;
};

export type Multimedia = MultimediaItem[];

// Path: src/features/stories/components/types.ts
