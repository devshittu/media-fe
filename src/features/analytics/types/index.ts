import { Story } from '@/features/stories';
import { PaginatedListQueryParams, PaginatedResponse } from '@/types';
export enum InteractionType {
  STORY_VIEW = 'view',
  ADD_BOOKMARK = 'bookmark',
  UNBOOKMARK = 'unbookmark',
  SHARE_STORY = 'share',
  CLICK_EXTERNAL = 'click_external',
  VIEW_STORYLINE = 'view_storyline',
  REPORT = 'report',
  HIGHLIGHT_TEXT = 'highlight_text',
}

export type AnalyticsDataStoryViewSchema = {
  event: string; // event name e.g storyView
  timestamp: number; // unix timestamp
  storyId: number;
  timeInView?: number; //in milliseconds
};
export type AnalyticsData = {
  // user: number;
  story: string;
  interaction_type: InteractionType;
  metadata?: AnalyticsDataStoryViewSchema | any;
  device_data?: any; // Optional device data
  location_data?: any; // Optional location data
  referral_data?: any; // Optional referral data
};

export type Analytics = {
  id: number;
  title: string;
  bookmark_category: string;
  note: string;
  user: number;
  story: Story;
  created_at: number;
};

export type AddBatchAnalyticsFormData = AnalyticsData[];

export type AnalyticsListProps = {
  data: AnalyticsListResponse;
  queryParams: PaginatedListQueryParams;
};

export type AnalyticsListResponse = PaginatedResponse<Analytics>;

// src/features/analytics/types/index.ts
