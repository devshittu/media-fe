import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import {
  PaginatedStoryListResponse,
  StoriesQueryParams,
  Story,
  StoryListResponse,
} from '../types';
import { QUERY_KEYS } from '@/config/query';
import { URI_USER_FEED } from '@/config/api-constants';
import { StoryAction } from '../components';
const { GET_USER_FEED_STORIES } = QUERY_KEYS;

type GetStoriesOptions = {
  params?: StoriesQueryParams;
  initialData?: any;
};

export const getUserFeedStories = ({
  params,
}: GetStoriesOptions): Promise<StoryListResponse> => {
  return apiClient.get(`${URI_USER_FEED}`, {
    params,
    requiresAuth: true,
  });
};

export const useUserFeedStories = ({ params }: GetStoriesOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_USER_FEED_STORIES, params],
    queryFn: () => getUserFeedStories({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryListResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

export const useInfiniteUserFeedStories = ({
  params,
  initialData,
}: GetStoriesOptions) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      [GET_USER_FEED_STORIES, 'all'],
      async ({ pageParam = 2 }) => {
        const response = await getUserFeedStories({
          params: { ...params, page: pageParam },
        });
        return response;
      },
      {
        getNextPageParam: (lastPage: StoryListResponse) => {
          return lastPage.current_page < lastPage.total_pages
            ? lastPage.current_page + 1
            : undefined;
        },

        initialData: { pages: [initialData], pageParams: [1] },
        //TODO: Keep data fresh for 5 minutes
        staleTime: 1000 * 60 * 5,
        // Keep data in cache for 10 minutes
        cacheTime: 1000 * 60 * 10,
      },
    );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

type UpdateStoryProps = Partial<Story>;
export const useUpdateUserFeedStoryInCache = () => {
  const queryClient = useQueryClient();

  const updateStory = (story_id: number | string, actionType: StoryAction) => {
    // queryClient.setQueryData<StoryListResponse | undefined>(
    queryClient.setQueryData<PaginatedStoryListResponse | undefined>(
      [GET_USER_FEED_STORIES, 'all'],
      (oldData: PaginatedStoryListResponse | undefined) => {
        if (!oldData) return;

        const newData: PaginatedStoryListResponse = {
          ...oldData,
          pages: oldData.pages.map((page: StoryListResponse) => ({
            ...page,
            results: page.results.map((story) => {
              if (story.id === story_id) {
                let updatedStory = { ...story };
                switch (actionType) {
                  case StoryAction.LIKE:
                    updatedStory = {
                      ...updatedStory,
                      likes_count: (updatedStory.likes_count || 0) + 1,
                      has_liked: true,
                    };
                    break;
                  case StoryAction.UNLIKE:
                    updatedStory = {
                      ...updatedStory,
                      likes_count: Math.max(
                        (updatedStory.likes_count || 0) - 1,
                        0,
                      ),
                      has_liked: false,
                    };
                    break;
                  case StoryAction.DISLIKE:
                    // Similar logic for dislike
                    break;
                  case StoryAction.UNDISLIKE:
                    // Similar logic for undislike
                    break;
                }
                return updatedStory;
              }
              return story;
            }),
          })),
        };

        return newData;
      },
    );
  };

  return updateStory;
};
//Path: src/features/stories/api/get-stories.ts