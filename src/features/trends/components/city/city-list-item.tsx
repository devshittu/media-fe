import { BookmarkIcon, MapPinIcon, StarIcon } from '@/components/illustrations';
import { CityListItemProps } from '../../types';

export const CityListItem: React.FC<CityListItemProps> = ({ city }) => {
  const { name, image_url, location, rating, price_per_week } = city;
  return (
    <div
      className="relative flex flex-col justify-between bg-whitex bg-cover text-gray-800 overflow-hidden cursor-pointer w-full object-cover object-center rounded shadow-md h-64 my-2"
      style={{ backgroundImage: `url('${image_url}')` }}
    >
      <div className="absolute bg-gradient-to-t from-green-400 to-blue-400 opacity-50 inset-0 z-0"></div>
      <div className="relative flex flex-row items-end h-72 w-full">
        <div className="absolute right-0 top-0 m-2">
          <BookmarkIcon className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200" />
        </div>
        <div className="p-6 rounded-lg flex flex-col w-full z-10">
          <h4 className="mt-1 text-white text-xl font-semibold leading-tight truncate">
            {name}
          </h4>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-sm flex items-center text-gray-300 font-normal">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {location}
              </h2>
            </div>
          </div>
          <div className="flex pt-4 text-sm text-gray-300">
            <div className="flex items-center mr-auto">
              <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
              <p className="font-normal">{rating}</p>
            </div>
            <div className="flex items-center font-medium text-white">
              ${price_per_week}
              <span className="text-gray-300 text-sm font-normal"> /wk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
