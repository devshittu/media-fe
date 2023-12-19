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

export enum ResponseStatusType {
  SUCCESS = 'success',
  FAILED = 'failed',
}
export type ResponseStatus = {
  status: ResponseStatusType.SUCCESS | ResponseStatusType.FAILED;
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
export type ServerErrorResponse = {
  status_code: number;
  error: Record<string, string[]>;
};
export type NewsChannel = {
  id: string;
  name: string;
  feed_url: string;
  logo_url: string;
};

export type AppFormProps = {
  onSuccess: () => void;
  onError?: () => void;
};

export enum AttentionType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export enum DeviceType {
  ANY = 'any',
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MOBILE = 'mobile',
}

// Path: src/types/index.ts
