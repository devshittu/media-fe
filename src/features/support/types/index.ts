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

export type LegalDocumentResponse = {
  url: string;
  title: string;
  content: string;
  app_version: number;
  created_at: number;
  updated_at: number;
};
export type SupportCategory = {
  id: number;
  name: string;
  slug: string;
  subcategories: SupportSubcategory[];
  created_at: number;
  updated_at: number;
};

type SupportSubcategory = {
  id: number;
  name: string;
  slug: string;
};

export type SupportArticle = {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary: string;
  reading_time: number;
  category: {
    name: string;
  };
  tags: string[];
  app_version: {
    version: string;
  };
  created_at: number;
  updated_at: number;
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

export type SupportCategoryListResponse = PaginatedResponse<SupportCategory>;
export type SupportArticleListResponse = PaginatedResponse<SupportArticle>;
export type FAQListResponse = PaginatedResponse<FAQ>;
