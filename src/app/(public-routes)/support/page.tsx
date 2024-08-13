import PublicLayout from '@/layouts/public-layout';
import React, { ReactElement, useMemo } from 'react';
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
  SupportCategory,
  SupportArticleListResponse,
  LegalURIParams,
  SupportCategoryListResponse,
  getSupportArticles,
} from '@/features/support';
import { SupportArticleList } from '@/features/support/components/blocks/support-article-list';
import {
  getSupportCategories,
  useGetSupportCategories,
} from '@/features/support/api/get-support-categories';
import { LoadingButtonTextList } from '@/components/loading';
import { getSupportArticlesByCategory } from '@/features/support/api/get-support-articles-by-category';
import { getSupportCategory } from '@/features/support/api/get-support-category';
import { PaginatedListQueryParams } from '@/types';
import { APP_SUPPORT_VERSION } from '@/config/constants';
import SupportCategoryList from '@/features/support/components/blocks/support-category-list';

// type PublicSupportPageProps = InferGetServerSidePropsType<
//   typeof getServerSideProps
// >;
// export default function SupportPage({
//   articles,
//   categories,
// }: PublicSupportPageProps) {

export default async function SupportPage() {
  const { articles, categories } = await fetchSupportData();
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
        title="Welcome to Your Support Hub"
        breadcrumbTrail={breadcrumbTrail}
        subtitle="Discover solutions, share insights, and navigate through our comprehensive guides. We're here to help you every step of the way."
      />

      <SearchSection />

      <TopicContentSection
        title={`Recent Support Articles`}
        description={`Explore our latest articles for up-to-date solutions, tips, and guidance to enhance your experience and resolve any queries.`}
      >
        <>
          <SupportArticleList articles={articles.results} />
        </>
      </TopicContentSection>

      <TopicContentSection
        title={`Explore Our Support Categories`}
        description={`Browse our wealth of knowledge by categories. Find detailed guides and solutions tailored to your needs.`}
      >
        <>
          {categories && categories?.results?.length > 0 && (
            <>
              {/* <HelpCenterSection
          categories={categories?.results}
        /> */}
              <SupportCategoryList categories={categories?.results} />
            </>
          )}
        </>
      </TopicContentSection>
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

SupportPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Welcome to the Support page',
};

async function fetchSupportData() {
  const version = APP_SUPPORT_VERSION;
  const pathParams = {
    version,
    page_size: 15,
  };

  try {
    const [articles, categories] = await Promise.all([
      getSupportArticles({ params: pathParams }),
      getSupportCategories({ params: { page_size: 100 } }),
    ]);

    return { articles, categories };
  } catch (error) {
    console.error('Error fetching support data:', error);
    return {
      articles: {
        results: [],
        count: 0,
        total_pages: 0,
        current_page: 0,
      },
      categories: {
        results: [],
        count: 0,
        total_pages: 0,
        current_page: 0,
      },
    };
  }
}

// export const getServerSideProps = async ({
//   params,
// }: GetServerSidePropsContext) => {
//   const version = APP_SUPPORT_VERSION;
//   // const category_slug = params?.category_slug as string;
//   const pathParams: Omit<LegalURIParams, 'document'> &
//     PaginatedListQueryParams = {
//     // document: 'article',
//     version,
//     page_size: 15,
//   };

//   try {
//     const articles = await getSupportArticles({ params: pathParams });
//     const categories = await getSupportCategories({
//       params: { page_size: 100 },
//     });

//     // Check if the results are empty
//     if (!articles) {
//       return {
//         props: {
//           error: 'No articles found.',
//           categories: [] as unknown as SupportCategoryListResponse,
//           articles: [] as unknown as SupportArticleListResponse,
//           pathParams,
//         },
//       };
//     }

//     return {
//       props: {
//         categories,
//         articles,
//         pathParams,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching articles in getServerSideProps:', error);

//     return {
//       props: {
//         error:
//           'There was an error fetching the articles. Please try again later.',

//         category: {} as SupportCategory,
//         articles: [] as unknown as SupportArticleListResponse,
//         pathParams,
//       },
//     };
//   }
// };
//Path: src/app/(public)/support/page.tsx
