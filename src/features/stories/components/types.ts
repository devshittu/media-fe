import { StoryItem } from '@/testing';

export type StoryListItemProps = {
  story: StoryItem;
  className?: string;
  categories: Record<string, string>;
};
export type StoryListProps = {
  data?: StoryItem[];
  scrollInfinite?: boolean;
  isLoading?: boolean;
};
