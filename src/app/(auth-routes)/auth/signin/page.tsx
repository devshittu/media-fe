import { SigninSection } from '@/features/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account.',
};
const SigninPage = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
        <SigninSection />
      </div>
    </>
  );
};

export default SigninPage;
