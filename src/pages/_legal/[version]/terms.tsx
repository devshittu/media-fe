import PublicLayout from '@/layouts/public-layout';
import React, { ReactElement } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Hero from '@/components/labs/public-page/hero';
import Footer from '@/components/labs/public-page/footer';
import Header from '@/components/labs/public-page/header';
import Newsletter from '@/components/labs/public-page/newsletter';
import { ContentSection } from '@/components/labs/public-page';
import {
  LegalURIParams,
  getLegalDocuments,
} from '@/features/support/api/get-legal-document';
import { removeChars } from '@/utils';
import { Markdown } from '@/components/markdown';

type PublicTermsPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
export default function PublicTermsPage({ document }: PublicTermsPageProps) {
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
        title={document.title || 'Legal document'}
        breadcrumbTrail={breadcrumbTrail}
        subtitle="Legal document"
      />

      {/* <ContentSection>
        <ReactMarkdown>{document.content}</ReactMarkdown>
      </ContentSection> */}

      <ContentSection>
        <Markdown>{document.content}</Markdown>
      </ContentSection>

      {/* <ExtraArticles articles={articles} heading="Related articles" /> */}
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

PublicTermsPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const version = params?.version as string;
  console.log('documentForVersion://', version);
  const pathParams: LegalURIParams = {
    document: 'terms',
    version,
  };

  console.log(JSON.stringify(pathParams));
  try {
    const document = await getLegalDocuments({ params: pathParams });

    // Check if the results are empty
    if (!document) {
      return {
        props: {
          error: 'No document found.',
          document: {
            url: null,
            title: null,
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

//Path: src/pages/legal/[version]/terms.tsx
