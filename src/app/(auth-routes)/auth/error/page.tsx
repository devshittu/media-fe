// src/app/auth/error/page.tsx
import { ErrorWrapper, NotFound } from '@/components/not-found';
import { useSearchParams } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Error Occured',
  description: 'An unexpected error occurred.',
}
type ErrorPageProps = {
  searchParams: {
    message?: string;
  };
}


const ErrorPage = ({ searchParams }: ErrorPageProps) => {
  const message = searchParams.message || 'An unexpected error occurred.';

  return (
    <ErrorWrapper
      errorCode="400"
      title="Invalid or Expired Token"
      subtitle="Error"
      description={message || "The password reset link you used is invalid or has expired. Please request a new password reset link."}
      primaryAction={{
        label: 'Try Again',
        href: '/auth/forgot-password',
      }}
      secondaryAction={{
        label: 'Home',
        href: '/',
      }}
    />
  );
};

export default ErrorPage;

// src/app/(auth-routes)/auth/error/page.tsx