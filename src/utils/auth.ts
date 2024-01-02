import { AuthStore } from '@/stores/auth';
import { apiClient } from '@/lib/api-client';
import { URI_AUTH_LOGOUT } from '@/config/api-constants';

export const signOut = async () => {
  try {
    await apiClient.post(URI_AUTH_LOGOUT, {}, { withCredentials: true });
  } catch (error) {
    console.error('Error during signout:', error);
  } finally {
    // queryClient.clear();
    AuthStore.getState().setAuthUserDetails(null);
    AuthStore.getState().setAccessToken(null);
    // Perform any additional cleanup if needed
  }
};

//Path: utils/auth.ts
