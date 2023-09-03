import { Entity } from '@/types';

// export type Category = Entity & {
export type Category = {
  id: string;
  title: string;
  description: string;
  slug: string;
};

export type CategoryResponse = {
  categories: Category[];
  page: number;
  total_pages: number;
  total: number;
};
