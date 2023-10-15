import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import { Storyline } from '../types';
import { URI_STORYLINES_BY_STORYLINE_ID } from '@/config/api-constants';
import { QUERY_KEYS } from '@/config/query';
import { PaginatedListQueryParams } from '@/types';
import { uriTemplate } from '@/utils';
const { GET_STORYLINES } = QUERY_KEYS;

type GetStorylineOptions = {
  storylineId: string;
  params?: PaginatedListQueryParams;
  initialData?: any;
};

export const getStoryline = ({
  storylineId,
  params,
}: GetStorylineOptions): Promise<Storyline> => {
  // try{} catch(err){}
  // const uri = params?.storylineId
  //   ? uriTemplate(URI_STORYLINES_BY_STORYLINE_ID, { storyline_id: params.storylineId })
  //   :
  //   // throw new Error(`Invalid parameter`)
  //   ;
  const uri = uriTemplate(URI_STORYLINES_BY_STORYLINE_ID, {
    storyline_id: storylineId as string,
  });
  return apiClient.get(uri, {
    params,
  });
};

export const useGetStoryline = ({
  storylineId,
  params,
}: GetStorylineOptions) => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: [GET_STORYLINES, storylineId, params],
    queryFn: () => getStoryline({ storylineId, params }),
    initialData: {} as Storyline,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
  };
};
