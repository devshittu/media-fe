import PublicLayout from '@/layouts/public-layout';
import React, { ReactElement } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Hero from '@/components/labs/public-page/hero';
import Footer from '@/components/labs/public-page/footer';
import Header from '@/components/labs/public-page/header';
import Newsletter from '@/components/labs/public-page/newsletter';
// import {  } from '@/features/support/components/blocks/extra-articles';
import { ContentSection, TopicContentSection } from '@/components/labs/public-page';
import {
  FAQList,
  SearchSection,
  ExtraArticles,
  HelpCenterSection,
  getSupportArticleBySlug,
} from '@/features/support';
import { LegalURIParams } from '@/features/support/api/get-legal-document';
import { Markdown } from '@/components/markdown';

type PublicFAQPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
export default function SupportArticlePage({ document }: PublicFAQPageProps) {
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
        title={document.title || ''}
        breadcrumbTrail={breadcrumbTrail}
        // subtitle="Find answers to common questions and learn how to make the most of our app."
      />

      <ContentSection>
        <Markdown>{document.content}</Markdown>
      </ContentSection>

      <SearchSection />
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

SupportArticlePage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const version = params?.version as string;
  const slug = params?.slug as string;
  const pathParams: LegalURIParams & { slug: string } = {
    document: 'article',
    version,
    slug,
  };

  try {
    const document = await getSupportArticleBySlug({ params: pathParams });

    // Check if the results are empty
    if (!document) {
      return {
        props: {
          error: 'No document found.',
          document: {
            url: null,
            title: null,
            slug: null,
            category: null,
            tags: null,
            content: null,
            app_version: null,
            created_at: null,
            updated_at: null,
          },
          pathParams,
        },
      };
    }

    return {
      props: {
        document,
        pathParams,
      },
    };
  } catch (error) {
    console.error('Error fetching document in getServerSideProps:', error);

    return {
      props: {
        error:
          'There was an error fetching the document. Please try again later.',

        document: {
          url: null,
          title: null,
          slug: null,
          category: null,
          tags: null,
          content: null,
          app_version: null,
          created_at: null,
          updated_at: null,
        },
        pathParams,
      },
    };
  }
};
