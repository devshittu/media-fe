export type TrendingListItemProps = {
  rank: number;
  category?: string;
  title: string;
  subtitle: string;
  onArrowClick?: () => void;
};

export type TrendingListProps = {
  trends: TrendingListItemProps[];
  onShowMore?: () => void;
};
