import PublicLayout from '@/layouts/public-layout';
import React, { ReactElement } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Hero from '@/components/labs/public-page/hero';
import Footer from '@/components/labs/public-page/footer';
import Header from '@/components/labs/public-page/header';
import Newsletter from '@/components/labs/public-page/newsletter';
// import {  } from '@/features/support/components/blocks/extra-articles';
import { ContentSection } from '@/components/labs/public-page';
import {
  FAQList,
  SearchSection,
  ExtraArticles,
  HelpCenterSection,
} from '@/features/support';

type PublicFAQPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
export default function Index({ categories }: PublicFAQPageProps) {
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
    // Add more categories as needed
  ];
  const menuLinks = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <Header menuLinks={menuLinks} />
      <Hero
        title="Frequently Asked Question"
        breadcrumbTrail={breadcrumbTrail}
        subtitle="Find answers to common questions and learn how to make the most of our app."
      />
      <ContentSection>
        <FAQList />
      </ContentSection>

      <SearchSection />

      {/* <HelpCenterSection
        title="Explore Our Support Categories"
        description="Browse our wealth of knowledge by categories. Find detailed guides and solutions tailored to your needs."
        categories={[
          'Account Security',
          'Account Preferences',
          'Themes',
          'My Identity',
          'How Tos',
        ]}
      /> */}

      <ExtraArticles heading="Related articles" />
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

Index.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const categories = [] as any[]; // await
  return {
    props: {
      categories,
    },
  };
};
//Path: src/pages/faq/index.tsx
