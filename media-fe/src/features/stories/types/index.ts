import { User } from '@/features/auth';
import { Entity, NewsChannel } from '@/types';

export type Story = Entity & {
  id: string;
  title: string;
  body: string;
  slug: string;
  category_id: string;
  updated_at: number;
  created_at: number;
  parent_stories: string[];
  children_stories: string[];
  user: User;
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
