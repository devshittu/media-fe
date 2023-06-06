export type StoryItem = {
  id: string;
  title: string;
  body: string;
  categoryId: string;
  createdAt: number;
  updatedAt: number;
};
export type StoryListItemProps = {
  story?: StoryItem;
  className?: string;
};
export type StoryListProps = {
  data?: StoryItem[];
};
