import { AuthUser } from '@/features/auth';
import { setItem, getItem, removeItem } from '@/utils/localStorage';

export const setStoredToken = (token: string | null) => {
  if (token) {
    setItem('accessToken', token);
  } else {
    removeItem('accessToken');
  }
};

export const getStoredToken = (): string | null => {
  return getItem<string>('accessToken');
};

export const setStoredUserDetails = (userDetails: AuthUser | null) => {
  if (userDetails) {
    setItem('authUserDetails', userDetails);
  } else {
    removeItem('authUserDetails');
  }
};

export const getStoredUserDetails = (): AuthUser | null => {
  return getItem<AuthUser>('authUserDetails');
};

//Path: utils/auth.ts
