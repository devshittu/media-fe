'use client';
import { BoxIcon } from '@/components/illustrations';
import { MenuButtonItem } from '@/components/menus/menu';
import { Fragment, useCallback, useEffect } from 'react';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

import { signOut, useSession } from 'next-auth/react';

export const AuthUserContextMenu = () => {
  const { push } = useRouter();
  // const signout = useSignout();
  // const handleSignout = () => {
  //   signout.submit();
  //   //Show successfull logout message in a toast.
  //   push('/');
  // };

  const router = useRouter();
  const { data: session } = useSession();
  console.log('session (client side)', session);
  const sessionDump = useSession();
  console.log('session (client side) sessionDump:', sessionDump);
  // you can directly call this method from your log out button somewhere in this component
  const signout = useCallback(() => {
    const accessToken = session?.user?.accessToken || undefined;

    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({ accessToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        /* send log to the Sentry if the endpoint fails
                if (!data.success)
                    notifySentry("Could not log out!")
                 */
      })
      .catch((error) => {
        console.log(error);
        /* send log to the Sentry if an error occurs
                notifySentry(error)
                 */
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
  return (
    <div className="w-48 text-slate-900 bg-white border-2 border-slate-600  shadow-md dark:shadow-slate-950 dark:bg-slate-950 dark:border-slate-400 dark:text-white">
      <MenuButtonItem
        icon={<BoxIcon className="w-5 h-5 stroke-[2.5] dark:text-white" />}
        label="Profile"
        onClick={() => console.log('Profile clicked')}
      />
      <MenuButtonItem
        label="Settings"
        onClick={() => console.log('Settings clicked')}
      />
      {/* <MenuButtonItem
        label="Messages"
        onClick={() => console.log('Messages clicked')}
      /> 
      <MenuButtonItem
        disabled
        label="Download"
        onClick={() => console.log('Download clicked')}
      />*/}
      <MenuButtonItem label="Signout" onClick={signout} />
    </div>
  );
};

// src/features/auth/components/context-menu/auth-user-context-menu.tsx