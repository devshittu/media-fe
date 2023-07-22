import { Entity } from '@/types';

export type Story = Entity & {
  id: string;
  title: string;
  body: string;
  slug: string;
  categoryId: string;
  updatedAt: string;
  parent_stories: string[];
  children_stories: string[];
};
// export type CreateStoryData = Pick<
//   Story,
//   'position' | 'department' | 'location' | 'info'
// >;
