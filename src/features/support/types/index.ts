import { PaginatedListQueryParams, PaginatedResponse } from '@/types';

export type AppVersion = {
  id: number;
  version: string;
  features: string;
  updates: string;
  bug_fixes: string;
  deprecations: string;
  // Add other fields as necessary
};

export type FAQ = {
  url: string;
  question: string;
  answer: string;
  app_version: AppVersion;
  created_at: number;
  updated_at: number;
};

export type SupportArticle = {
  url: string;
  title: string;
  slug: string;
  content: string;
  category: number; // or CategoryType if you have a defined type for the category
  tags: string[]; // assuming tags are an array of strings
  app_version: number; // or AppVersionType if you have a defined type for the app version
  created_at: number; // assuming this is a Unix timestamp
  updated_at: number; // assuming this is a Unix timestamp
};

export type AddSupportArticleFormData = {
  // bookmark_category: SupportArticleCategory;
  note: string;
  story_id: string;
};

export type SupportArticleListProps = {
  data: SupportArticleListResponse;
  queryParams: PaginatedListQueryParams;
};

export type SupportArticleListResponse = PaginatedResponse<SupportArticle>;
export type FAQListResponse = PaginatedResponse<FAQ>;
