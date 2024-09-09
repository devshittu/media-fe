import { notFound, redirect } from 'next/navigation';
import { ResetPasswordSection } from '@/features/auth';
import { Metadata } from 'next';
import { validateResetToken } from '@/features/auth/api/post-validate-reset-token';

export const metadata: Metadata = {
  title: 'Reset Your Password',
  description:
    "Enter a new password to reset your account. Once reset, you'll be redirected to the sign-in page.",
};
const ResetPasswordPage = async ({ params }: { params: { token: string } }) => {
  const { token } = params;

  try {
    const response = await validateResetToken({ token });

    // If the token is valid, render the reset password form

    return (
      <>
        <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
          <ResetPasswordSection token={token} />
        </div>
      </>
    );
  } catch (error) {
    // Handle any unexpected errors and redirect to an error page
    console.error('Token validation failed:', error);
    return redirect('/auth/error?message=Token+Invalid+or+Expired');
  }
};

export default ResetPasswordPage;
// Path: src/app/(auth-routes)/auth/reset-password/[token]/page.tsx
