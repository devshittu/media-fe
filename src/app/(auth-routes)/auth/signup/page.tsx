
import React from 'react';

import { SEO } from '@/components/seo';
import { SignupSection } from '@/features/auth/components/signup-form/signup-section';

const SignupPage = () => {
  
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
        <SignupSection />
      </div>
    </div>
  );
};

export default SignupPage;

// Path: src/pages/auth/signup/index.tsx
