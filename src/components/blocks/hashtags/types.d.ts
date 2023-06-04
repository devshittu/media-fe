export type HashtagItem = {
  hashtagId: string;
  name: string;
};
export type HashtagItemProps = {
  hashtag: HashtagItem;
  closable?: boolean;
};
export type HashtagListProps = {
  data?: HashtagItem[];
};
