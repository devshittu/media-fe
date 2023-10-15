import React from 'react';

import { Seo } from '@/components/seo';
import { AccountVerificationSection } from '@/features/auth/components/signup-form/account-verification-section';

const AccountVerificationPage = () => {
  return (
    <div className="h-screen">
      <Seo title="Account Verification" />
      <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
        <AccountVerificationSection />
      </div>
    </div>
  );
};

export default AccountVerificationPage;

// Path: src/pages/auth/signup/verify-account.tsx
