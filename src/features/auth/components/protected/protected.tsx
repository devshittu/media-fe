// import { ReactNode } from 'react';
// import { useRouter } from 'next/router';
// import { useAuthStore } from '@/stores/auth';
// import { Loading } from '@/components/loading';
// import {
//   NotificationType,
//   notificationsStore,
//   useNotifications,
// } from '@/stores/notifications';

// export type ProtectedProps = {
//   children: ReactNode;
// };

// export const Protected = ({ children }: ProtectedProps) => {
//   const router = useRouter();
//   // const { showNotification } = useNotifications();
//   const { authUserDetails, accessToken, isRefreshingToken } = useAuthStore();
//   // Redirect to login if no access token and not refreshing token
//   if (!accessToken && !isRefreshingToken) {
//     router.replace('/auth/signin?redirect=' + router.asPath);

//     notificationsStore.getState().showNotification({
//       type: NotificationType.WARNING,
//       title: 'Error',
//       duration: 5000,
//       message: 'You must login to continue.',
//     });
//     return null;
//   }

//   // Show loading indicator while token is being refreshed or user details are being fetched
//   if (isRefreshingToken || !authUserDetails) {
//     return (
//       <div className="flex flex-col justify-center h-full">
//         <Loading />
//       </div>
//     );
//   }

//   // Render children if user is authenticated
//   return <>{children}</>;
// };

// // Path: src/features/auth/components/protected/protected.tsx

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