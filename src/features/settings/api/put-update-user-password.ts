import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { UpdatePasswordData } from '../types';
import { ApiResponse } from '@/types';
import { QUERY_KEYS } from '@/config/query';
import { URI_USERS_UPDATE_PASSWORD } from '@/config/api-constants';
const { UPDATE_USER_PASSWORD } = QUERY_KEYS;

type UseUpdateUserPasswordOptions = {
  // data: Setting;
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
};

export const updateUserPassword = (
  data: UpdatePasswordData,
): Promise<ApiResponse> => {
  return apiClient.put(`${URI_USERS_UPDATE_PASSWORD}`, data);
};
export const useUpdateUserPassword = ({
  // data,
  onSuccess,
  onError,
}: UseUpdateUserPasswordOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: [UPDATE_USER_PASSWORD],
    mutationFn: updateUserPassword,
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
