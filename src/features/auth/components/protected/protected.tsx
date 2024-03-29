import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/stores/auth';
import { Loading } from '@/components/loading';
import { NotificationType, notificationsStore } from '@/stores/notifications';

export type ProtectedProps = {
  children: ReactNode;
};

export const Protected = ({ children }: ProtectedProps) => {
  const router = useRouter();
  const { authUserDetails, accessToken, isRefreshingToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken && !isRefreshingToken) {
      router.replace('/auth/signin?redirect=' + router.asPath);

      notificationsStore.getState().showNotification({
        type: NotificationType.WARNING,
        title: 'Error',
        duration: 5000,
        message: 'You must login to continue.',
      });
    }
  }, [accessToken, isRefreshingToken, router]);

  if (!accessToken && !isRefreshingToken) {
    return null;
  }

  if (isRefreshingToken || !authUserDetails) {
    return (
      <div className="flex flex-col justify-center h-full">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
};
// Path: src/features/auth/components/protected/protected.tsx
