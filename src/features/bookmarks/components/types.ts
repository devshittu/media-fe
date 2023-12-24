import { InfiniteData } from "@tanstack/react-query";
import { BookmarkListResponse } from "../types";
import { CacheRefType } from "@/types";


export type InfiniteBookmarksResponse = {
  queryKey: CacheRefType;
  data: InfiniteData<BookmarkListResponse> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isLoading: boolean;
};