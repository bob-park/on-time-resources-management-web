import { useQuery } from '@tanstack/react-query';

import { getDashboard } from '@/domain/devices/api/devices';

export function useDeviceDashboard() {
  const { data, isLoading } = useQuery<DeviceDashboard>({
    queryKey: ['devices', 'dashboard'],
    queryFn: () => getDashboard(),
  });

  return { dashboard: data, isLoading };
}
