import { Entity, PaginatedResponse } from '@/types';


export type Category = {
  id: number;
  slug: string;
  deleted_at?: number | null;
  created_at?: number;
  updated_at?: number;
  title: string;
  description: string;
};

export type CategoryListResponse = PaginatedResponse<Category>;
