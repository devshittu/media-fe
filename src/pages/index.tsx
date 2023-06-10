import { Seo } from '@/components/seo';
import { ReactElement } from 'react';
import PublicLayout from '@/layouts/public-layout';
import Feature from '@/components/labs/LandingPage/Feature';
import MarqueeExamples from '@/components/labs/LandingPage/Marquee';
export default function Home() {
  return (
    <>
      <Seo title="New App" />
      <Feature />
      <MarqueeExamples />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
