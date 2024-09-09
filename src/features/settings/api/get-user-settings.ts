import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Setting } from '../types';

import { ApiCallResultType, ApiResponse, CacheRefType } from '@/types';
import { QUERY_KEYS } from '@/config/query';
import { URI_AUTH_ME_SETTINGS } from '@/config/api-constants';
const { GET_USER_SETTINGS } = QUERY_KEYS;
type GetUserSettingsOptions = {
  params?: {
    user_id?: string | undefined;
  };
};

export const getUserSettings = ({
  params,
}: GetUserSettingsOptions): Promise<Setting> => {
  return apiClient.get(`${URI_AUTH_ME_SETTINGS}`, {
    params,
    requiresAuth: true,
  });
};

export const useUserSettings = ({ params }: GetUserSettingsOptions) => {
  const queryKey: CacheRefType = [
    GET_USER_SETTINGS,
    ApiCallResultType.DISCRETE,
    params,
  ];
  const { data, isFetching, isFetched } = useQuery<Setting>({
    queryKey, // Updated queryKey type to string[]
    queryFn: () => getUserSettings({ params }),
    // enabled: !!params?.category_id,
    initialData: {} as Setting, // Set initialData to an empty Setting object
  });

  return {
    queryKey,
    data,
    isLoading: isFetching && !isFetched,
  };
};

//Path: src/features/settings/api/get-user-settings.ts
