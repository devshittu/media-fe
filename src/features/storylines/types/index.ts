import { Story } from '@/features/stories';
import { PaginatedListQueryParams, PaginatedResponse } from '@/types';

export type Storyline = {
  id: string;
  description: string;
  summary: string;
  subject: string;
  hashtags: string[];
  stories_count: number;
};

export type StorylineListProps = {
  data: StorylineListResponse;
  queryParams: PaginatedListQueryParams;
};

export type StorylineListResponse = PaginatedResponse<Storyline>;
