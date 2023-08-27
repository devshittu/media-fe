import { Category } from '../types';

export type CategoryItemProps = {
  category: Category;
  closable?: boolean;
};
export type CategoryListProps = {
  dataItems?: Category[];
};
