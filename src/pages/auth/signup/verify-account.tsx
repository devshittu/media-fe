import React from 'react';

import { SEO } from '@/components/seo';
import { AccountVerificationSection } from '@/features/auth/components/signup-form/account-verification-section';

const AccountVerificationPage = () => {
  const schemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: 'Account Verification',
    description: 'Account Verification page',
    // ... other structured data properties
  };
  return (
    <div className="h-screen">
      <SEO
        title="Account Verification"
        description="Account Verification"
        schemaOrgJSONLD={schemaOrgJSONLD}
        canonicalUrl={'/auth/signin'}
      />
      <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
        <AccountVerificationSection />
      </div>
    </div>
  );
};

export default AccountVerificationPage;

// Path: src/pages/auth/signup/verify-account.tsx
