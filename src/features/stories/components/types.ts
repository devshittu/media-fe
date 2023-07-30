import { Story } from '../types';

export type StoryListItemProps = {
  story: Story;
  className?: string;
  categories: Record<string, string>;
};
export type StoryListProps = {
  data?: Story[];
  scrollInfinite?: boolean;
  totalPages: number;
  isLoading?: boolean;
};
