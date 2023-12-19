export type Channel = {
  name: string;
  profession: string;
  avatar_url: string;
  stories_count: number;
  rating: number;
  total_reads: number;
};
// Define the prop types
export type ChannelListItemProps = {
  channel: Channel;
};

export type ChannelListProps = {
  channels: Channel[];
  onShowMore?: () => void;
};

// Path: src/features/channels/types/index.ts
