// import { PaginatedListQueryParams, PaginatedResponse } from '@/types';
// import { useInfiniteQuery } from '@tanstack/react-query';

// type FetchFunction<T, Q extends PaginatedListQueryParams> = (params: Q) => Promise<PaginatedResponse<T>>;

// type InfiniteQueryOptions<T, Q extends PaginatedListQueryParams, F extends FetchFunction<T, Q>> = {
//   queryKey: (string | any)[];
//   fetchDataFunction: F;
//   initialData: PaginatedResponse<T>;
//   params: Q;
// };

// export const useInfiniteData = <T, Q extends PaginatedListQueryParams, F extends FetchFunction<T, Q>>({
//   queryKey,
//   fetchDataFunction,
//   initialData,
//   params,
// }: InfiniteQueryOptions<T, Q, F>) => {
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery(
//       queryKey,
//     async ({ pageParam = 2 }) => { // Start with pageParam = 2
//       const response = await fetchDataFunction({ ...params, page: pageParam });
//       return response;
//     },
//     {
//       getNextPageParam: (lastPage: PaginatedResponse<T>) => {
//         return lastPage.current_page < lastPage.total_pages
//           ? lastPage.current_page + 1
//           : undefined;
//       },
//         initialData: { pages: [initialData], pageParams: [1] },
//         staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
//         cacheTime: 1000 * 60 * 10, // Keep data in cache for 10 minutes
//       },
//     );

//   return {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   };
// };





// useInfiniteData.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { StoryListResponse } from '../types'; // Adjust the import path

type UseInfiniteDataOptions<TParams> = {
  fetchFunction: (params: TParams) => Promise<StoryListResponse>;
  queryKey: any[];
  params: TParams;
  initialData?: any;
};

export const useInfiniteData = <TParams>({
  fetchFunction,
  queryKey,
  params,
  initialData,
}: UseInfiniteDataOptions<TParams>) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    queryKey,
    async ({ pageParam = 2 }) => {
      const response = await fetchFunction({ ...params, page: pageParam });
      return response;
    },
    {
      getNextPageParam: (lastPage: StoryListResponse) => {
        return lastPage.current_page < lastPage.total_pages
          ? lastPage.current_page + 1
          : undefined;
      },
      initialData: { pages: [initialData], pageParams: [1] },
      staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Keep data in cache for 10 minutes
    },
  );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

// Path: src/features/stories/hooks/useInfiniteData.ts
