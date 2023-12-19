// Import necessary modules
import { ChannelListItemProps, ChannelListProps } from '../../types';
import { ChannelListItem } from './channel-list-item';

// ChannelList component
export const ChannelList = ({ channels, onShowMore }: ChannelListProps) => {
  return (
    <div>
      {channels.map((channel, index) => (
        <ChannelListItem key={index} channel={channel} />
      ))}
      {onShowMore && (
        <button
          onClick={onShowMore}
          className="mt-4 text-sm font-medium text-cyan-500"
        >
          Show More
        </button>
      )}
    </div>
  );
};

// Path: src/features/channels/components/blocks/channel-list.tsx
