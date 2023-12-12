import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { UpdateUserProfileData } from '../types';
import { ApiResponse } from '@/types';
import { QUERY_KEYS } from '@/config/query';
import { URI_USERS_UPDATE_USER } from '@/config/api-constants';
const { UPDATE_USER_PROFILE_INFO } = QUERY_KEYS;

type UseUpdateUserProfileOptions = {
  // data: Setting;
  onSuccess?: (data: any) => void;
  onError?: (message: any) => void;
};

export const updateUserProfile = (
  data: UpdateUserProfileData,
): Promise<ApiResponse> => {
  return apiClient.put(`${URI_USERS_UPDATE_USER}`, data);
};
export const useUpdateUserProfile = ({
  // data,
  onSuccess,
  onError,
}: UseUpdateUserProfileOptions) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationKey: [UPDATE_USER_PROFILE_INFO],
    mutationFn: updateUserProfile,
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
