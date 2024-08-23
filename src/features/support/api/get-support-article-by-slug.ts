import { slug } from './../../../utils/helpers';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { SupportArticle, SupportArticleListResponse } from '../types';
import { URI_SUPPORT_BY_VERSION_ARTICLES_BY_SLUG } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import { PaginatedListQueryParams } from '@/types';
import { uriTemplate } from '@/utils';
import { LegalURIParams } from './get-legal-document';
const { GET_SUPPORT_ARTICLES } = QUERY_KEYS;

type GetSupportArticleBySlugOptions = {
  params: LegalURIParams & PaginatedListQueryParams & { slug: string };
  initialData?: any;
};

export const getSupportArticleBySlug = ({
  params,
}: GetSupportArticleBySlugOptions): Promise<SupportArticle> => {
  const uri = uriTemplate(URI_SUPPORT_BY_VERSION_ARTICLES_BY_SLUG, {
    version: params.version?.toString() as string,
    slug: params.slug,
  });
  return apiClient.get(`${uri}`, {
    params,
    requiresAuth: false,
  });
};

export const useGetSupportArticleBySlug = ({
  params,
}: GetSupportArticleBySlugOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_SUPPORT_ARTICLES, params],
    queryFn: () => getSupportArticleBySlug({ params }),
    initialData: {} as SupportArticle,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
// src/features/support/api/get-support-article-by-slug.ts
