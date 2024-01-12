import { ErrorCode } from '@/config/error-codes';

export type Entity = {
  id: string;
  created_at: number;
};

export type ObjectItem = {
  id: string;
};

export type ApiResponse = ResponseStatus & {
  // status: string;
  // data: ApiResponseData;
  data: any;
};

// If you know the possible types of `detail`, list them here
type DetailType = string | string[] | { [key: string]: any } | null;

export type ApiResponseError = {
  status: ResponseStatusType;
  status_code: number;
  error: {
    code: ErrorCode;
    detail: DetailType;
  };
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
//to call with only a specified number of the page_size and no pagination, though it is an array of response where the page_size is specified.
export enum ApiCallResultType {
  SINGLE = 'single', //single result and non-arrayed result and non-paginated results
  DISCRETE = 'discrete', // for non-paginated arrayed results with page_size specified
  INFINITE = 'infinite', //for paginated arrayed results
}
// export type CacheRefType = QueryKey;
export type CacheRefType = [string, ApiCallResultType, ...any[]];
// Path: src/types/index.ts
