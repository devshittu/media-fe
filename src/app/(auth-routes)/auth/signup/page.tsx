
import React from 'react';

import { SEO } from '@/components/seo';
import { NotificationType, useNotifications } from '@/stores/notifications';

import { SignupForm } from '@/features/auth/components/signup-form/signup-form';
import { useSignupStore } from '@/stores/auth';

const SignupPage = () => {
  // const router = useRouter();
  // const { showNotification } = useNotifications();

  const onSuccess = () => {
    // showNotification({
    //   type: NotificationType.SUCCESS,
    //   title: 'Success',
    //   duration: 5000,
    //   message: 'Your user account created successfully!',
    // });
    // // const redirect = router.query.redirect as string;
    // // router.replace(redirect || '/stories');
    // TODO: add the continuation of the signup such that reg can continue on the wizard.
    // router.push(`/auth/signup/verify-account`);
  };
  const schemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: 'Sign up',
    description: 'Sign up page',
    // ... other structured data properties
  };
  return (
    <div className="h-screen">
      <SEO
        title="Signup"
        description="Signup page"
        schemaOrgJSONLD={schemaOrgJSONLD}
        canonicalUrl={'/auth/signup'}
      />
      <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
        {/* <SignupForm onSuccess={onSuccess} /> */}
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;

// Path: src/pages/auth/signup/index.tsx
