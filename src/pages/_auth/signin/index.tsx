import { useRouter } from 'next/router';
import { SEO } from '@/components/seo';
import { SigninForm } from '@/features/auth';
import { NotificationType, useNotifications } from '@/stores/notifications';

const SigninPage = () => {
  const router = useRouter();
  const { showNotification } = useNotifications();

  const schemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: 'Home',
    description: 'Home page',
    // ... other structured data properties
  };

  const onSuccess = () => {
    showNotification({
      type: NotificationType.SUCCESS,
      title: 'Success',
      duration: 5000,
      message: 'Sign in success!',
    });
    console.log('Sign in success', 'redirect');
    const redirect = router.query.redirect as string;
    router.replace(redirect || '/stories');
  };

  return (
    <>
      <SEO
        title="Signup"
        description="Signup page"
        schemaOrgJSONLD={schemaOrgJSONLD}
        canonicalUrl={'/auth/signup'}
      />
      <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
        <SigninForm onSuccess={onSuccess} />
      </div>
    </>
  );
};

// SigninPage.getLayout = function getLayout(
//   page: ReactElement
// ) {
//   return <AuthLayout title="Log In">{page}</AuthLayout>;
// };

export default SigninPage;
