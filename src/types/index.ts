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
