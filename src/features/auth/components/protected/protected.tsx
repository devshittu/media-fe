'use client';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
// import { DecodedAccessToken, refreshAccessToken } from '@/auth';

export type ProtectedProps = {
  children: ReactNode;
};

export const Protected = ({ children }: ProtectedProps) => {
//   const { data: session, status } = useSession();
//   const [refreshTimeout, setRefreshTimeout] = useState<NodeJS.Timeout | null>(null);

//   const refreshSession = useCallback(async () => {
//     const accessToken = session?.user?.accessToken;

//     if (accessToken) {
//       try {
//         const decodedToken: DecodedAccessToken = jwtDecode(accessToken);
//         const expiresAt = decodedToken.exp * 1000; // Convert to milliseconds
//         const currentTime = Date.now();
//         const refreshBeforeExpiry = 10 * 1000; // Refresh 10 seconds before actual expiry
//         const refreshTime = expiresAt - currentTime - refreshBeforeExpiry;

//         if (refreshTime > 0) {
//           console.log(`Setting up token refresh in ${refreshTime / 1000} seconds.`);
          
//           const timeoutId = setTimeout(async () => {
//             console.log('Refreshing session before expiry');
//             // const newToken = await refreshAccessToken(session.user);
//             // if (newToken) {
//             //   console.log('Token refreshed successfully');
//             //   // Optionally update session or other related state
//             // } else {
//             //   console.error('Token refresh failed');
//             // }
//           }, refreshTime);

//           // Store the timeout ID to clear it later if needed
//           setRefreshTimeout(timeoutId);
//         } else {
//           console.log('Token is already expired or about to expire soon. Refreshing now.');
//         //   await refreshAccessToken(session.user);
//         }
//       } catch (error) {
//         console.error('Failed to decode access token:', error);
//       }
//     }
//   }, [session]);

//   useEffect(() => {
//     if (status === 'authenticated') {
//       refreshSession();
//     }

//     // Cleanup timeout on component unmount or session change
//     return () => {
//       if (refreshTimeout) {
//         clearTimeout(refreshTimeout);
//       }
//     };
//   }, [status, refreshSession, refreshTimeout]);

//   if (status === 'loading') {
//     return <h1>Loading...</h1>;
//   }

  return <>{children}</>;
};

// Path: src/features/auth/components/protected/protected.tsx
