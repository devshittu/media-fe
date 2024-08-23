// Import necessary modules
import { FilmIcon, StarIcon } from '@/components/illustrations';
import { Image } from '@/components/labs';
import { ChannelListItemProps } from '../../types';

// ChannelListitem component
export const ChannelListItem = ({ channel }: ChannelListItemProps) => {
  const { name, profession, avatar_url, stories_count, rating, total_reads } =
    channel;
  return (
    <div className="mb-6 sm:w-1/2x rounded-lg bg-black dark:bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className='h-12 w-12'>
          <Image
            width={`32`}
            height={`32`}
            className="mr-2 h-10 w-10 rounded-full object-cover"
            src={avatar_url}
            alt={name}
          /></div>
          <div>
            <h3 className="text-base font-semibold text-gray-100 dark:text-gray-900">
              {name}
            </h3>
            <span className="block text-xs font-normal text-gray-400 dark:text-gray-500">
              {profession}
            </span>
          </div>
        </div>
        <p className="text-sm font-medium text-cyan-500">
          <span className="mr-0.5">+</span>Follow
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm font-semibold text-gray-400 dark:text-slate-600">
        <div className="flex">
          <FilmIcon className="mr-2 h-5 w-5 text-base text-gray-400 dark:text-slate-600" />
          <span className="mr-1">{stories_count}</span> Stories
        </div>
        <div className="flex items-center">
          <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
          {rating.toFixed(1)} ({total_reads} Reads)
        </div>
      </div>
    </div>
  );
};

//Path: src/features/channels/components/blocks/channel-list-item.tsx
