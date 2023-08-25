import { useRouter } from 'next/router';

export const useAuthRedirect = () => {
  const router = useRouter();

  const handleFinish = async (redirectPath: string) => {
    const redirect = router.query.redirect as string;
    await router.replace(redirect || redirectPath);
    console.log('Navigation is complete!');
  };

  return { handleFinish };
};
