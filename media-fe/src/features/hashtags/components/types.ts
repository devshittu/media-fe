import { Hashtag } from '../types';

export type HashtagItemProps = {
  hashtag: Hashtag;
  closable?: boolean;
};
export type HashtagListProps = {
  dataItems?: Hashtag[];
};
