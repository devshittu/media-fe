// src/features/auth/hooks/useSignout.ts
import { useCallback, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Route } from 'next';

export const useSignout = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const signout = useCallback(() => {
    const accessToken = session?.user?.accessToken || undefined;

    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({ accessToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Optionally, handle logging errors with Sentry or other services

  //       /* send log to the Sentry if the endpoint fails
                // if (!data.success)
                //     notifySentry("Could not log out!")
                //  */
      })
      .catch((error) => {
        console.log(error);
        // Optionally, handle logging errors with Sentry or other services

//          /* send log to the Sentry if an error occurs
//                 notifySentry(error)
//              */
      })
      .finally(async () => {
        signOut({ redirect: false }).then(() => {
          router.push(`${window.location.origin}/auth/signin` as Route<string>);
        });
      });
  }, [router, session]);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      // remember that error?
      // force the user to log out if the session has RefreshAccessTokenError

      signout();
    }
  }, [session, signout]);

  return { signout };
};

// src/features/auth/hooks/useSignout.ts