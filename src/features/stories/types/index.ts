import { Entity } from '@/types';

export type Story = Entity & {
  id: string;
  title: string;
  body: string;
  slug: string;
  categoryId: string;
  updated_at: string;
  parent_stories: string[];
  children_stories: string[];
};
export type StoryResponse = {
  stories: Story[];
  page: number;
  total_pages: number;
  total: number;
};
// export type CreateStoryData = Pick<
//   Story,
//   'position' | 'department' | 'location' | 'info'
// >;
