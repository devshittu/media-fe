import { apiClient } from '@/lib/api-client';
import { ValidateTokenData } from '../types';
import { URI_AUTH_VALIDATE_RESET_TOKEN } from '@/config/api-constants';
import { ApiResponse } from '@/types';


export const validateResetToken = (data: ValidateTokenData): Promise<ApiResponse> => {
  return apiClient.post(`${URI_AUTH_VALIDATE_RESET_TOKEN}`, data);
};


// Path: src/features/auth/api/post-validate-reset-token.ts
