import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Story } from '../types';

type GetStoryOptions = {
  storyId: string;
};

export const getStory = ({ storyId }: GetStoryOptions): Promise<Story> => {
  return apiClient.get(`/stories/${storyId}`);
};

export const useStory = ({ storyId }: GetStoryOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: ['stories', storyId],
    queryFn: () => getStory({ storyId }),
  });

  return { data, isLoading };
};
