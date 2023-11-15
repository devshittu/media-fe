import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { LegalDocumentResponse } from '../types';
import {
  URI_SUPPORT_BY_VERSION_PRIVACY_POLICIES,
  URI_SUPPORT_BY_VERSION_TERMS_AND_CONDITIONS,
} from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import { uriTemplate } from '@/utils';
const { GET_LEGAL_DOCUMENT } = QUERY_KEYS;

export type LegalURIParams = {
  document: 'privacy' | 'terms' | 'faq' | 'article';
  version?: string | null;
};
type GetLegalDocumentsOptions = {
  params: LegalURIParams;
  initialData?: any;
};

export const getLegalDocuments = ({
  params,
}: GetLegalDocumentsOptions): Promise<LegalDocumentResponse> => {
  const uri = uriTemplate(
    params.document === 'privacy'
      ? URI_SUPPORT_BY_VERSION_PRIVACY_POLICIES
      : URI_SUPPORT_BY_VERSION_TERMS_AND_CONDITIONS,
    {
      version: params.version?.toString() as string,
    },
  );
  return apiClient.get(`${uri}`, {
    params,
    requiresAuth: false 
  });
};

export const useGetLegalDocuments = ({ params }: GetLegalDocumentsOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_LEGAL_DOCUMENT, params],
    queryFn: () => getLegalDocuments({ params }),
    initialData: {} as LegalDocumentResponse,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
