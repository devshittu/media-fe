import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { Seo } from '@/components/seo';
import { LoginForm } from '@/features/auth';
import { useNotifications } from '@/stores/notifications';
// import { AuthLayout } from '@/layouts/auth-layout';

const LoginPage = () => {
  const router = useRouter();
  const { showNotification } = useNotifications();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      title: 'Success',
      duration: 5000,
      message: 'Job Created!',
    });
    const redirect = router.query.redirect as string;
    router.replace(redirect || '/stories');
  };

  return (
    <>
      <Seo title="Log In" />
      <LoginForm onSuccess={onSuccess} />
    </>
  );
};

// LoginPage.getLayout = function getLayout(
//   page: ReactElement
// ) {
//   return <AuthLayout title="Log In">{page}</AuthLayout>;
// };

export default LoginPage;
