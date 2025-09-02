import { InfiniteData, QueryKey, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getDashboard, getDevice } from '@/domain/devices/api/devices';
import { getNextPageParams } from '@/shared/api';

export function useDeviceDashboard() {
  const { data, isLoading } = useQuery<DeviceDashboard>({
    queryKey: ['devices', 'dashboard'],
    queryFn: () => getDashboard(),
  });

  return { dashboard: data, isLoading };
}

export function useDevices(req: DeviceSearchRequest, initPageParams: PageRequest) {
  const { data, fetchNextPage, refetch, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery<
    Page<Device>,
    unknown,
    InfiniteData<Page<Device>>,
    QueryKey,
    PageRequest
  >({
    queryKey: ['devices', req],
    queryFn: async ({ pageParam }) => getDevice({ ...pageParam, ...req }),
    initialPageParam: {
      ...initPageParams,
    },
    getNextPageParam: (lastPage) => getNextPageParams<Device>(lastPage),
  });

  const devices = (data?.pages || ([] as Page<Device>[])).reduce(
    (current, value) => current.concat(value.content),
    [] as Device[],
  );

  const page: Pick<Page<Device>, 'total' | 'pageable'> = {
    total: data?.pages[0]?.total ?? 0,
    pageable: {
      pageSize: initPageParams.size,
      pageNumber: data?.pages[0]?.pageable?.pageNumber ?? 0,
      sort: data?.pages[0].pageable.sort ?? { orders: [{ property: 'purchaseDate', direction: 'DESC' }] },
    },
  };

  return { devices, isLoading, isFetchingNextPage, fetchNextPage, refetch, page, hasNextPage };
}
