'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SupportCategory, SupportArticleListResponse } from '@/features/support';
import { getSupportArticlesByCategory } from '@/features/support/api/get-support-articles-by-category';
import { getSupportCategory } from '@/features/support/api/get-support-category';
import Hero from '@/components/labs/public-page/hero';
import Footer from '@/components/labs/public-page/footer';
import Header from '@/components/labs/public-page/header';
import Newsletter from '@/components/labs/public-page/newsletter';
import { TopicContentSection } from '@/components/labs/public-page';
import { SupportArticleList } from '@/features/support/components/blocks/support-article-list';
import { SearchSection, ExtraArticles } from '@/features/support';

type SupportArticleListPageContentProps = {
  categorySlug: string;
  version: string;
};

export default function SupportArticleListPageContent({
  categorySlug,
  version,
}: SupportArticleListPageContentProps) {
  const [category, setCategory] = useState<SupportCategory | null>(null);
  const [document, setDocument] = useState<SupportArticleListResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pathParams = {
          version,
          category_slug: categorySlug,
          page_size: 15,
        };

        const [document, category] = await Promise.all([
          getSupportArticlesByCategory({ params: pathParams }),
          getSupportCategory({ params: { slug: categorySlug } }),
        ]);

        if (!document || !category) {
          setError('No document found.');
          return;
        }

        setCategory(category);
        setDocument(document);
      } catch (error) {
        console.error('Error fetching document:', error);
        setError('There was an error fetching the document. Please try again later.');
      }
    };

    fetchData();
  }, [categorySlug, version]);

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header menuLinks={menuLinks} />
      <Hero title={category?.name || ''} breadcrumbTrail={breadcrumbTrail} />

      <TopicContentSection title={`Articles`} description={`recent`}>
        {document && <SupportArticleList articles={document.results} />}
      </TopicContentSection>

      <SearchSection />
      <ExtraArticles heading="Related articles" />
      <Newsletter
        heading="Sign up for our newsletter"
        description="Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email."
        buttonText="Subscribe to news"
      />

      <Footer categories={footerCategories} />
    </>
  );
}
