import { useRouter, useSearchParams } from 'next/navigation';

export const useAuthRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFinish = async (redirectPath: string) => {
    // const redirect = router.query.redirect as string;
    const redirect = searchParams?.get('redirect') as string;
    await router.replace(redirect || redirectPath);
    console.log('Navigation is complete!');
  };

  return { handleFinish };
};
