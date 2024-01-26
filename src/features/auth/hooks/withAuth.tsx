// hoc/withAuth.tsx
import { getSession } from 'next-auth/react';
import React from 'react';
import { GetServerSidePropsContext } from 'next';

interface WithAuthProps {
  children?: React.ReactNode;
}

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P> => {
  const EnhancedComponent: React.FC<P> = (props: P) => {
    return (
      <>
        <div>
          {React.createElement<React.ComponentProps<typeof WrappedComponent>>(
            WrappedComponent,
            props,
          )}
        </div>
      </>
    );
  };

  EnhancedComponent.displayName = `WithAuth(${getDisplayName(
    WrappedComponent,
  )})`;
  return EnhancedComponent;
};

function getDisplayName<P>(WrappedComponent: React.ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
export const getServerSidePropsWithAuth = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  return { props: { session } };
};

// Path: src/hoc/withAuth.ts
// Usage

// // pages/protectedPage.tsx
// import React from 'react';
// import { withAuth, getServerSidePropsWithAuth } from '../hoc/withAuth';

// const ProtectedPage = () => {
//   return <div>Protected Content</div>;
// };

// export const getServerSideProps = getServerSidePropsWithAuth;

// export default withAuth(ProtectedPage);

// // pages/_app.tsx
// import { SessionProvider } from 'next-auth/react';
// import { AppProps } from 'next/app';

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <SessionProvider session={pageProps.session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }

// export default MyApp;
