import { ErrorCode } from '@/config/error-codes';
import { NotificationType, notificationsStore } from '@/stores/notifications';
import { ApiResponseError } from '@/types';

export const parseError = (errorResponse: any): ApiResponseError | null => {
  try {
    if (errorResponse?.response?.data) {
      const errorData: ApiResponseError = errorResponse.response.data;

      if (errorData.status === 'failed' && errorData.error) {
        // Handle error detail if it's an object
        let errorDetail = errorData.error.detail;
        if (typeof errorDetail === 'object' && errorDetail !== null) {
          errorDetail = Object.entries(errorDetail)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
        }

        // Show notification for specific error codes
        if (Object.values(ErrorCode).includes(errorData.error.code)) {
          notificationsStore.getState().showNotification({
            type: NotificationType.ERROR,
            title: 'Error',
            duration: 5000,
            message: errorDetail as string,
          });
        }

        return {
          ...errorData,
          error: {
            ...errorData.error,
            detail: errorDetail,
          },
        };
      }
    }
  } catch (e) {
    console.error('Error parsing response:', e);
  }
  return null;
};
// Path: src/utils/parse-error.ts
