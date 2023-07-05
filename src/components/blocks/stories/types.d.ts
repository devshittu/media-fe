import { StoryItem } from '@/testing';

export type StoryListItemProps = {
  story: StoryItem;
  className?: string;
};
export type StoryListProps = {
  data?: StoryItem[];
  scrollInfinite?: boolean;
};
