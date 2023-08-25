export type Hashtag = {
  id: string;
  label: string;
  count: number;
  stories: string[];
};

export type HashtagResponse = {
  hashtags: Hashtag[];
  page: number;
  total_pages: number;
  total: number;
};
