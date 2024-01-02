import { City } from '../../types';
import { CityListItem } from './city-list-item';

export type CityListProps = {
  cities: City[];
};

export const CityList: React.FC<CityListProps> = ({ cities }) => {
  return (
    <div className="grid mt-5 grid-cols-2 space-x-4 overflow-y-scroll flexx justify-center items-center w-full">
      {cities.map((city, index) => (
        <CityListItem key={index} city={city} />
      ))}
    </div>
  );
};
