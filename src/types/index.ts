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

export type PaginationLinks = {
  next?: string | null;
  previous?: string | null;
};

export type PaginatedListQueryParams = {
  page?: number | null;
  page_size?: number | null;
};

export type PaginatedResponse<T> = {
  links?: PaginationLinks;
  count: number;
  total_pages: number;
  current_page: number;
  results: T[];
};

export type NewsChannel = {
  id: string;
  name: string;
  feed_url: string;
  logo_url: string;
};
