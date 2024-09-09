import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { StoriesQueryParams, StoryListResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_STORIES_SEARCH } from '@/config/api-constants';
import { InfiniteStoriesResponse } from '../components';
import { ApiCallResultType, CacheRefType } from '@/types';
const { SEARCH_STORIES } = QUERY_KEYS;

type GetStoriesOptions = {
  params?: StoriesQueryParams;
  initialData?: any;
};

export const searchStories = ({
  params,
}: GetStoriesOptions): Promise<StoryListResponse> => {
  console.log('searchStories: search params', JSON.stringify(params));
  return apiClient.get(`${URI_STORIES_SEARCH}`, {
    params,
    requiresAuth: true,
  });
};

export const useInfiniteSearchStories = ({
  params,
  initialData,
}: GetStoriesOptions): InfiniteStoriesResponse => {
  console.log(
    'useInfiniteSearchStories: search params',
    JSON.stringify(params),
  );
  const queryKey: CacheRefType = [
    SEARCH_STORIES,
    ApiCallResultType.INFINITE,
    ,
    params, // include params to make the query key unique based on parameters
  ];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
    error,
    refetch,
  } = useInfiniteQuery<StoryListResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      // Assert pageParam as number before using it
      const page = pageParam as number;
      const response = await searchStories({
        params: { ...params, page },
      });
      return response;
    },
    enabled: false, // Disable automatic query execution
    getNextPageParam: (lastPage, allPages) => {
      // Check if there are more pages to load
      if (lastPage?.current_page < lastPage?.total_pages) {
        return lastPage.current_page + 1;
      }
      return undefined; // No more pages
    },
    initialPageParam: 1,
  });
  // Extract count from the first page
  const count = data?.pages[0]?.count;
  return {
    queryKey,
    data,
    count: count || 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFetching && !isFetched,
    error,
    refetch,
  };
};

// Path: src/features/stories/api/get-search-stories.ts

// export const useSearchStories = ({ params }: GetStoriesOptions) => {
//   const queryKey: CacheRefType = [
//     SEARCH_STORIES,
//     ApiCallResultType.DISCRETE,
//     params
//   ];

//   const { data, isFetching, isFetched, error, refetch, } = useQuery({
//     queryKey,
//     queryFn: () => searchStories({ params }),
//     // enabled: !!params?.q,
//     enabled: false,
//     initialData: {} as StoryListResponse,
//   });

//   return {
//     queryKey,
//     data,
//     isLoading: isFetching && !isFetched,
//     error,
//     refetch,
//   };
// };

// import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
// import { apiClient } from '@/lib/api-client';
// import { StoriesQueryParams, StoryListResponse } from '../types';
// import { QUERY_KEYS } from '@/config/query';
// import { InfiniteStoriesResponse } from '../components';
// import { ApiCallResultType, CacheRefType } from '@/types';
// import { URI_STORIES_SEARCH } from '@/config/api-constants';

// const { SEARCH_STORIES } = QUERY_KEYS;

// type GetStoriesOptions = {
//   params?: StoriesQueryParams;
//   initialData?: any;
// };

// export const searchStories = async ({
//   params,
// }: GetStoriesOptions): Promise<StoryListResponse> => {
//     console.log('searchStories searching with ', params);
//   return apiClient.get(`${URI_STORIES_SEARCH}`, {
//     params,
//   });
// };

// export const useInfiniteSearchStories = () => {
//   const queryClient = useQueryClient();

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isFetched,
//     isFetching,
//     error,
//     refetch,
//   } = useInfiniteQuery<StoryListResponse>({
//     queryKey: [SEARCH_STORIES, ApiCallResultType.INFINITE],
//     queryFn: async ({ pageParam = 1, queryKey }) => {
//       const params = queryKey[2] as StoriesQueryParams;
//       const page = pageParam as number;
//       const response = await searchStories({
//         params: { ...params, page },
//       });
//       return response;
//     },
//     enabled: false, // Disable automatic query execution
//     getNextPageParam: (lastPage) => {
//       if (lastPage?.current_page < lastPage?.total_pages) {
//         return lastPage.current_page + 1;
//       }
//       return undefined;
//     },
//     initialPageParam: 1,
//   });

//   // Custom function to refetch with new parameters
//   const refetchWithParams = (newParams: StoriesQueryParams) => {
//     console.log('Refetching with ', newParams, 'data', data);
//     queryClient.setQueryData([SEARCH_STORIES, ApiCallResultType.INFINITE, newParams], data);
//     refetch();
//   };

//   return {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isFetched,
//     isFetching,
//     isLoading: isFetching && !isFetched,
//     error,
//     refetch: refetchWithParams, // Expose the custom refetch function
//   };
// };

// src/features/stories/api/get-search-stories.ts