import { PaginatedListQueryParams, PaginatedResponse } from '@/types';

export type AddFeedbackFormData = {
  content_type_name: string;
  object_id: number;
  report_type: string;
  description: string;
  is_anonymous: boolean;
};

export type Report = {
  id: number;
};

export enum ReportType {
  Rumour = 'Rumour',
  Spam = 'Spam',
  Inappropriate = 'Inappropriate',
  Other = 'Other',
}

export type BookmarkListProps = {
  data: BookmarkListResponse;
  queryParams: PaginatedListQueryParams;
};

export type BookmarkListResponse = PaginatedResponse<Report>;
