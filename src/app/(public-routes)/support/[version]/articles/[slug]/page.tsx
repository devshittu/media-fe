// src/app/stories/page.tsx
import PublicLayout from '@/layouts/public-layout';
import React from 'react';
import Hero from '@/components/labs/public-page/hero';
import Footer from '@/components/labs/public-page/footer';
import Header from '@/components/labs/public-page/header';
import Newsletter from '@/components/labs/public-page/newsletter';
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
} from '@/features/support';
import { LegalURIParams } from '@/features/support/api/get-legal-document';
import { Markdown } from '@/components/markdown';
import { notFound } from 'next/navigation';

type SupportArticlePageProps = {
  document: {
    title: string;
    content: string;
  };
  breadcrumbTrail: { href: string; label: string }[];
  footerCategories: {
    name: string;
    links: { label: string; url: string }[];
  }[];
  menuLinks: { href: string; label: string }[];
};

export default async function SupportArticlePage({
  params,
}: {
  params: { version: string; slug: string };
}) {
  const { version, slug } = params;
  const pathParams: LegalURIParams & { slug: string } = {
    document: 'article',
    version,
    slug,
  };

  try {
    const document = await getSupportArticleBySlug({ params: pathParams });

    if (!document) {
      notFound();
    }

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
        <Hero title={document.title || ''} breadcrumbTrail={breadcrumbTrail} />

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
  } catch (error) {
    console.error('Error fetching document:', error);
    notFound();
  }
}

SupportArticlePage.getLayout = function getLayout(page: React.ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
