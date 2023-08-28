import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { StoryResponse } from '../types';
import { QUERY_KEYS } from '@/config/query';
const { GET_STORYLINES } = QUERY_KEYS;

type GetStorylineOptions = {
  storyId: string;
  params?: {
    // category_id?: string | undefined;
    page?: number | undefined;
    per_page?: number | undefined;
    // hashtag?: string | undefined;
  };
};

export const getStorylines = ({
  storyId,
  params,
}: GetStorylineOptions): Promise<StoryResponse> => {
  return apiClient.get(`/stories/${storyId}`, {
    params,
  });
};

export const useStorylines = ({ storyId, params }: GetStorylineOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORYLINES, storyId],
    queryFn: () => getStorylines({ storyId, params }),
    // enabled: !!params?.category_id,
    initialData: {} as StoryResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

//Path: src/features/stories/api/get-stories.ts
