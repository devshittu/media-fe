import { PaginatedResponse } from '@/types';

export type Hashtag = {
  name: string;
  stories_count: number;
};

export type HashtagListResponse = PaginatedResponse<Hashtag>;

// src/features/hashtags/types/index.ts