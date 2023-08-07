import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Setting } from '../types';

type GetUserSettingsOptions = {
  params?: {
    user_id?: string | undefined;
  };
};

export const getUserSettings = ({
  params,
}: GetUserSettingsOptions): Promise<Setting> => {
  return apiClient.get('/settings', {
    params,
  });
};

export const useUserSettings = ({ params }: GetUserSettingsOptions) => {
  const { data, isFetching, isFetched } = useQuery<Setting>({
    queryKey: ['settings', params], // Updated queryKey type to string[]
    queryFn: () => getUserSettings({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as Setting, // Set initialData to an empty Setting object
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};

//Path: src/features/settings/api/get-user-settings.ts
