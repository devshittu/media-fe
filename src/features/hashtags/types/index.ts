import { PaginatedResponse } from '@/types';

export type Hashtag = {
  name: string;
  stories_count: number;
};

export type HashtagListResponse = PaginatedResponse<Hashtag>;
