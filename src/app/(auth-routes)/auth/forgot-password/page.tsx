// import { useRouter } from 'next/router';
import { SEO } from '@/components/seo';
import { ForgotPasswordSection } from '@/features/auth';
import { NotificationType, useNotifications } from '@/stores/notifications';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Forgot Password Request',
  description: 'Request for new password reset.',
}
const ForgotPasswordPage = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col px-5 py-14 justify-center items-center">
        <ForgotPasswordSection />
      </div>
    </>
  );
};


export default ForgotPasswordPage;
// Path: src/app/(auth-routes)/auth/forgot-password/page.tsx
