import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Setting } from '../types';
import { ApiResponse } from '@/types';
import { QUERY_KEYS } from '@/config/query';
import { URI_AUTH_ME_SETTINGS } from '@/config/api-constants';
const { UPDATE_USER_SETTINGS } = QUERY_KEYS;

type UseUpdateUserSettingsOptions = {
  // data: Setting;
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
};

export const updateUserSettings = (data: Setting): Promise<ApiResponse> => {
  return apiClient.patch(`${URI_AUTH_ME_SETTINGS}`, data);
};
export const useUpdateUserSettings = ({
  // data,
  onSuccess,
  onError,
}: UseUpdateUserSettingsOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: [UPDATE_USER_SETTINGS],
    mutationFn: updateUserSettings,
    onSuccess: (data) => {
      // Invalidate and refetch something when a post is unbookmarked
      //   queryClient.invalidateQueries('someQueryKey');
      onSuccess?.(data);
    },
    onError: (data) => {
      onError?.(data);
    },
  });

  return {
    submit,
    isLoading,
  };
};

//Path: src/features/settings/api/update-user-settings.ts
