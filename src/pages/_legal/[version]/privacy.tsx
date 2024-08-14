import PublicLayout from '@/layouts/public-layout';
import React, { ReactElement } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Hero from '@/components/labs/public-page/hero';
import Footer from '@/components/labs/public-page/footer';
import Header from '@/components/labs/public-page/header';
import { ContentSection } from '@/components/labs/public-page';
import ReactMarkdown from 'react-markdown';
import {
  LegalURIParams,
  getLegalDocuments,
} from '@/features/support/api/get-legal-document';
import { removeChars } from '@/utils';
import { Markdown } from '@/components/markdown';

type PublicFAQPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
const PrivacyPolicyPage = ({ document }: PublicFAQPageProps) => {
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
  const articles = [
    {
      imageUrl:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png',
      title: 'Our first office',
      description:
        'Over the past year, Volosoft has undergone many changes! After months of preparation.',
      readTime: '2 minutes',
      url: '#',
    },
    {
      imageUrl:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png',
      title: 'Enterprise design tips',
      description:
        'Over the past year, Volosoft has undergone many changes! After months of preparation.',
      readTime: '12 minutes',
      url: '#',
    },
    {
      imageUrl:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png',
      title: 'We partnered with Google',
      description:
        'Over the past year, Volosoft has undergone many changes! After months of preparation.',
      readTime: '8 minutes',
      url: '#',
    },
    {
      imageUrl:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png',
      title: 'Our first project with React',
      description:
        'Over the past year, Volosoft has undergone many changes! After months of preparation.',
      readTime: '4 minutes',
      url: '#',
    },
    // Add more articles here...
  ];

  return (
    <>
      <Header menuLinks={menuLinks} />
      <Hero
        title="Privacy Policy"
        breadcrumbTrail={breadcrumbTrail}
        subtitle="Find answers to common questions and learn how to make the most of our app."
      />

      <ContentSection>
        <Markdown>{document.content}</Markdown>
      </ContentSection>

      <Footer categories={footerCategories} />
    </>
  );
};

PrivacyPolicyPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const version = params?.version as string;
  console.log('documentForVersion://', version);
  const pathParams: LegalURIParams = {
    document: 'privacy',
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

export default PrivacyPolicyPage;
//Path: src/pages/faq/index.tsx
