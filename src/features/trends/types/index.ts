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

export type City = {
  name: string;
  image_url: string;
  location: string;
  rating: number;
  price_per_week: number;
};

export type CityListItemProps = {
  city: City;
};

export type CityListProps = {
  cities: City[];
};
