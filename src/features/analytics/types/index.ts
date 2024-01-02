import { Story } from '@/features/stories';
// import { AnalyticsDataType } from '@/stores/analytics';
import { PaginatedListQueryParams, PaginatedResponse } from '@/types';

export enum InteractionType {
  STORY_VIEW = 'view',

  LIKE = 'add-like',
  REMOVE_LIKE = 'remove-like',
  DISLIKE = 'add-dislike',
  REMOVE_DISLIKE = 'remove-dislike',

  ADD_BOOKMARK = 'add-bookmark',
  UPDATE_BOOKMARK = 'update-bookmark',
  UNBOOKMARK = 'remove-bookmark',
  SHARE_STORY = 'share',
  CLICK_EXTERNAL = 'click_external',
  VIEW_STORYLINE = 'view_storyline',
  REPORT = 'report',
  HIGHLIGHT_TEXT = 'highlight_text',
}

export type AnalyticsFilterCriteria = {
  [K in keyof AnalyticsDataType]?: AnalyticsDataType[K];
};

export type AnalyticsDataBaseSchema = {
  id?: string;
  // ... other relevant fields for bookmarking
};
export type AnalyticsDataAddBookmarkSchema = AnalyticsDataBaseSchema & {
  bookmark_id: string;
  story_id: string;
  // ... other relevant fields for bookmarking
};

export type AnalyticsDataStoryViewSchema = AnalyticsDataBaseSchema & {
  story_id: string;
  time_in_view?: string; //in milliseconds
  // source_page?: string;
  // platform?: 'WhatsApp' | 'Twitter' | 'Facebook' | 'Other';
  // link_url?: string;
  // source_section?: string;
};
export type AnalyticsDataShareStorySchema = AnalyticsDataBaseSchema & {
  story_id: string;
  source_page: string;
  platform: 'WhatsApp' | 'Twitter' | 'Facebook' | 'Other';
  // link_url?: string;
  // source_section?: string;
};

export type AnalyticsDataSchema =
  | AnalyticsDataStoryViewSchema
  | AnalyticsDataAddBookmarkSchema
  | AnalyticsDataShareStorySchema;
// ... other schemas

export type AnalyticsDataType = {
  analytics_store_id: string;
  event: InteractionType;
  story: number | string;
  interaction_type: InteractionType;
  timestamp: number;
  metadata: AnalyticsDataSchema;
  device_data?: any; // Optional device data
  location_data?: any; // Optional location data
  referral_data?: any; // Optional referral data
};

export type AnalyticsData = {
  // user: number;
  id: string;
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

export type AddBatchAnalyticsFormData = (AnalyticsData | AnalyticsDataType)[];

export type AnalyticsListProps = {
  data: AnalyticsListResponse;
  queryParams: PaginatedListQueryParams;
};

export type AnalyticsListResponse = PaginatedResponse<Analytics>;

// src/features/analytics/types/index.ts
