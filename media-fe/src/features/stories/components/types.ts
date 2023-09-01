import { Story, StoryResponse } from '../types';

export type StoryListItemProps = {
  story: Story;
  className?: string;
  categories: Record<string, string>;
};
export type StoryListProps = {
  data?: StoryResponse;
  scrollInfinite?: boolean;
  totalPages: number;
};
