import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import { Loading } from '@/components/loading';

import { useAuthUser } from '../../api/get-auth-user';
import { Link } from '@/components/labs';

export type ProtectedProps = {
  children: ReactNode;
};

export const Protected = ({ children }: ProtectedProps) => {
  const { replace, asPath } = useRouter();
  const { data: authUser, isLoading, error } = useAuthUser();

  useEffect(() => {
    if (error) {
      console.error(
        'authdebug: user.error:// ',
        error,
        'current url:// ',
        asPath,
      ); // Log the error for debugging
      replace(`/auth/login?redirect=${asPath}`, undefined, { shallow: true });
    }
    // if (!user.data && !user.isLoading) {
    //   replace(`/auth/login?redirect=${asPath}`, undefined, { shallow: true });
    // }
  }, [authUser, asPath, replace, error]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center h-full">
        from protected routes
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Please <Link href="/">log in</Link> to continue.
      </div>
    );
  }
  if (!authUser && !isLoading) return null;

  return <>{children}</>;
};

// Path: src/features/auth/components/protected/protected.tsx
