import { Entity } from '@/types';

// export type Category = Entity & {
export type Category = {
  id: string;
  title: string;
  description: string;
  slug: string;
};
