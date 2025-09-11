'use client';

import { useDevice } from '@/domain/devices/queries/devices';

export default function DeviceDetailContents({ id }: Readonly<{ id: string }>) {
  // queries
  const { device, isLoading } = useDevice(id);

  return <div className="flex size-full flex-col gap-3"></div>;
}
