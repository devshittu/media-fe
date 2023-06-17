export type StoriesResponse = {
  stories: StoryItem[];
  total: number;
};

export type StoryItem = {
  id: string;
  title: string;
  slug: string;
  body: string;
  categoryId: string;
  createdAt: number;
  updatedAt: number;
  parent_stories: string[];
  children_stories: string[];
};

export type CategoryItem = {
  id: string;
  title: string;
  description: string;
  title: string;
};
