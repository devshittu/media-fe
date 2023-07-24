import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Setting } from '../types';

type GetSettingsOptions = {
  params?: {
    user_id?: string | undefined;
  };
};

export const getSettings = ({
  params,
}: GetSettingsOptions): Promise<Setting[]> => {
  return apiClient.get('/settings', {
    params,
  });
};

export const useSettings = ({ params }: GetSettingsOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['settings', params],
    queryFn: () => getSettings({ params }),
    // enabled: !!params?.categoryId,
    initialData: [],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
