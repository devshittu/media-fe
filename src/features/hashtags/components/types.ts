import { Hashtag } from '../types';

export type HashtagItemProps = {
  hashtag: Hashtag;
  closable?: boolean;
  size?: 'small' | 'base' | 'large';
};
export type HashtagListProps = {
  dataItems?: Hashtag[];
};
