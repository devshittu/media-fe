export type Entity = {
  id: string;
  created_at: number;
};

export type ObjectItem = {
  id: string;
};

export type ApiResponse = {
  status: string;
  // data: ApiResponseData;
};
export type NewsChannel = {
  id: string;
  name: string;
  feed_url: string;
  logo_url: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  last_login: string;
  roles: string[];
  avatar_url: string;
  news_channel?: NewsChannel; // Or you could use id's here like: newsChannelIds: string[];
};
