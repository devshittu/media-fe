export type StoriesResponse = {
  stories: StoryItem[];
  total: number;
};

export type StoryItem = {
  id: string;
  title: string;
  slug: string;
  body: string;
  category_id: string;
  created_at: number;
  updated_at: number;
  parent_stories: string[];
  children_stories: string[];
};

export type CategoryItem = {
  id: string;
  title: string;
  description: string;
  title: string;
};

export type HashtagItem = {
  id: string;
  label: string;
  count: number;
  stories: string[];
};
