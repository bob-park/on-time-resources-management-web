import { useMutation, useQueryClient } from '@tanstack/react-query';

import { provideUserDevice } from '@/domain/users/apis/userDevices';

export function useUserDeviceProvide({ onSuccess, onError }: QueryMutationHandle<Device>) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['users', 'devices', 'provide'],
    mutationFn: (req: { id: string; deviceId: string; body: { startDate: Date; endDate?: Date } }) =>
      provideUserDevice(req),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['devices'] });

      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });

  return { provideUserDevice: mutate, isLoading: isPending };
}
