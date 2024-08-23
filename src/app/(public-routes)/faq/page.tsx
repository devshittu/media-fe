import PublicLayout from '@/layouts/public-layout';
import Hero from '@/components/labs/public-page/hero';
import Footer from '@/components/labs/public-page/footer';
import Header from '@/components/labs/public-page/header';
import Newsletter from '@/components/labs/public-page/newsletter';
import { ContentSection } from '@/components/labs/public-page';
import { Markdown } from '@/components/markdown';
import { LegalURIParams, getLegalDocuments } from '@/features/support/api/get-legal-document';
import { ReactElement } from 'react';
import { notFound } from 'next/navigation';
import {
  FAQList,
} from '@/features/support';
// import { generateMetadata } from '@/utils/metadata-config';
import { Metadata } from 'next';

type PublicFAQPageProps = {
  document: {
    title: string;
    content: string;
  };
};
export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Learn more about our company and our values.',
}


export default async function PublicFAQPage({ params }: { params: { version: string } }) {
  // const version = params?.version;
  // const pathParams: LegalURIParams = {
  //   document: 'terms',
  //   // version,
  // };

  // const document = await getLegalDocuments({ params: pathParams });


  // if (!document) {
  //   notFound();
  // }

  const breadcrumbTrail = [
    { href: '/parent1', label: 'Parent 1' },
    { href: '/parent2', label: 'Parent 2' },
    { href: '/current', label: 'Current' },
  ];

  const footerCategories = [
    {
      name: 'Company',
      links: [
        { label: 'About', url: '#' },
        { label: 'Careers', url: '#' },
        { label: 'Brand Center', url: '#' },
        { label: 'Blog', url: '#' },
      ],
    },
    {
      name: 'Help center',
      links: [
        { label: 'Discord Server', url: '#' },
        { label: 'Twitter', url: '#' },
        { label: 'Facebook', url: '#' },
        { label: 'Contact Us', url: '#' },
      ],
    },
  ];

  const menuLinks = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <Header menuLinks={menuLinks} />
      {/* <Hero
        title={document.title || 'Legal document'}
        breadcrumbTrail={breadcrumbTrail}
        subtitle="Legal document"
      /> */}
      <ContentSection>
        <FAQList />
      </ContentSection>
      <Newsletter
        heading="Sign up for our newsletter"
        description="Stay up to date with the roadmap progress, announcements and
              exclusive discounts feel free to sign up with your email."
        buttonText="Subscribe to news"
      />
      <Footer categories={footerCategories} />
    </>
  );
}

PublicFAQPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};


//Path: src/pages/faq/index.tsx
