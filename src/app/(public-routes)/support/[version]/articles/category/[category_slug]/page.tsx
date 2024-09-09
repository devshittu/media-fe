import React, { ReactElement } from 'react';
import PublicLayout from '@/layouts/public-layout';
import { LegalURIParams } from '@/features/support/api/get-legal-document';
import { APP_SUPPORT_VERSION } from '@/config/constants';
import SupportArticleListPageContent from '@/app/(public-routes)/support/_components/SupportArticleListPageContent';
import { Metadata, ResolvingMetadata } from 'next';
import { getSupportArticleBySlug } from '@/features/support';

type PageProps = {
  params: { id: string; version: string; category_slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params

  const { version, category_slug } = params;

  // Fetch the support article using the slug and version
  const article = await getSupportArticleBySlug({
    params: { version, document: 'article', slug: category_slug },
  });

  console.log('Fetched Article: ', article);

  // Generate metadata using the article data
  return {
    title: article.title || 'Support Article',
    description: article.summary || 'Support article details.',
    openGraph: {
      title: article.title,
      description: article.summary,
      // images: article.images || [],
    },
  };
}
export default function SupportArticleListPage({
  params,
}: {
  params: { category_slug: string };
}) {
  const version = APP_SUPPORT_VERSION;
  const categorySlug = params.category_slug;

  return (
    <SupportArticleListPageContent
      categorySlug={categorySlug}
      version={version}
    />
  );
}

SupportArticleListPage.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

// src/app/(public-routes)/support/[version]/articles/category/[category_slug]/page.tsx
