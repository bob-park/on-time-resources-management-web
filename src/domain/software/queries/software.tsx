import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { getSoftware } from '@/domain/software/api/software';
import { getNextPageParams } from '@/shared/api';

export function useSoftware(req: SoftwareSearchRequest, initPageParams: PageRequest) {
  const { data, fetchNextPage, refetch, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery<
    Page<Software>,
    unknown,
    InfiniteData<Page<Software>>,
    QueryKey,
    PageRequest
  >({
    queryKey: ['software', req],
    queryFn: async ({ pageParam }) => getSoftware(req, pageParam),
    initialPageParam: {
      ...initPageParams,
    },
    getNextPageParam: (lastPage) => getNextPageParams<Software>(lastPage),
  });

  const software = (data?.pages || ([] as Page<Software>[])).reduce(
    (current, value) => current.concat(value.content),
    [] as Software[],
  );

  const page: Pick<Page<Software>, 'total' | 'pageable'> = {
    total: data?.pages[0]?.total ?? 0,
    pageable: {
      pageSize: initPageParams.size,
      pageNumber: data?.pages[0]?.pageable?.pageNumber ?? 0,
      sort: data?.pages[0].pageable.sort ?? { orders: [{ property: 'purchaseDate', direction: 'DESC' }] },
    },
  };

  return { software, isLoading, isFetchingNextPage, fetchNextPage, refetch, page, hasNextPage };
}
