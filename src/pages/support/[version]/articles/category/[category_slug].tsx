import PublicLayout from '@/layouts/public-layout';
import React, { ReactElement } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Hero from '@/components/labs/public-page/hero';
import Footer from '@/components/labs/public-page/footer';
import Header from '@/components/labs/public-page/header';
import Newsletter from '@/components/labs/public-page/newsletter';
// import {  } from '@/features/support/components/blocks/extra-articles';
import {
  ContentSection,
  TopicContentSection,
} from '@/components/labs/public-page';
import {
  FAQList,
  SearchSection,
  ExtraArticles,
  HelpCenterSection,
  getSupportArticleBySlug,
  SupportCategory,
  SupportArticleListResponse,
} from '@/features/support';
import { LegalURIParams } from '@/features/support/api/get-legal-document';
import { Markdown } from '@/components/markdown';
import { APP_SUPPORT_VERSION } from '@/config/constants';
import { PaginatedListQueryParams } from '@/types';
import { getSupportArticlesByCategory } from '@/features/support/api/get-support-articles-by-category';
import { getSupportCategory } from '@/features/support/api/get-support-category';
import { SupportArticleList } from '@/features/support/components/blocks/support-article-list';

type PublicArticleListPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
export default function SupportArticleListPage({
  document,
  category,
}: PublicArticleListPageProps) {
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
        title={category.name || ''}
        breadcrumbTrail={breadcrumbTrail}
        // subtitle="Find answers to common questions and learn how to make the most of our app."
      />

      <TopicContentSection title={`Articles`} description={`recent`}>
        <>
          <SupportArticleList articles={document.results} />
        </>
      </TopicContentSection>

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

SupportArticleListPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const version = APP_SUPPORT_VERSION;
  const category_slug = params?.category_slug as string;
  const pathParams: Omit<LegalURIParams, 'document'> &
    PaginatedListQueryParams & { category_slug: string } = {
    // document: 'article',
    version,
    category_slug,
    page_size: 15,
  };

  try {
    const document = await getSupportArticlesByCategory({ params: pathParams });
    const category = await getSupportCategory({
      params: { slug: category_slug },
    });

    // Check if the results are empty
    if (!document) {
      return {
        props: {
          error: 'No document found.',
          category: {} as SupportCategory,
          document: [] as unknown as SupportArticleListResponse,
          pathParams,
        },
      };
    }

    return {
      props: {
        category,
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

        category: {} as SupportCategory,
        document: [] as unknown as SupportArticleListResponse,
        pathParams,
      },
    };
  }
};

// Path: src/pages/support/[version]/articles/category/[category_slug].tsx
