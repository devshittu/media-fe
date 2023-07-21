import { Entity } from '@/types';

export type Category = Entity & {
 id: string;
      title: string;
      description: string;
      slug: string;
};