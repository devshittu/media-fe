
import React from 'react';
import { SEO } from '@/components/seo';
import { SignupSection } from '@/features/auth/components/signup-form/signup-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: "Register a new account.",
  
}
const SignupPage = () => {
  
  return (
    <div className="h-screen">
      <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
        <SignupSection />
      </div>
    </div>
  );
};

export default SignupPage;

// Path: src/pages/auth/signup/index.tsx
