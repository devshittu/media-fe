import React, { ReactElement } from 'react';
import PublicLayout from '@/layouts/public-layout';
import { LegalURIParams } from '@/features/support/api/get-legal-document';
import { APP_SUPPORT_VERSION } from '@/config/constants';
import SupportArticleListPageContent from '@/app/(public-routes)/support/_components/SupportArticleListPageContent';

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
