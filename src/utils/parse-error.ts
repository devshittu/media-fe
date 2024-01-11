import { ErrorCode } from '@/config/error-codes';
import { NotificationType, notificationsStore } from '@/stores/notifications';
import { ApiResponseError, ResponseStatusType } from '@/types';

export const parseError = (errorResponse: any): ApiResponseError | null => {
  try {
    if (
      errorResponse?.response?.data
    ) {
      const errorData: ApiResponseError = errorResponse.response.data;
      if (errorData.status === 'failed' && errorData.error) {
        // Show notification for specific error codes
        if (Object.values(ErrorCode).includes(errorData.error.code)) {
          notificationsStore.getState().showNotification({
            type: NotificationType.ERROR,
            title: 'Error',
            duration: 5000,
            message: errorData.error.detail as string,
          });
        }
        return errorData;
      }
    }
  } catch (e) {
    console.error('Error parsing response:', e);
  }
  return null;
};

// Path: src/utils/parse-error.ts
