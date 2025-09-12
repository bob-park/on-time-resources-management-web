'use client';

import { notFound } from 'next/navigation';

import { useDevice } from '@/domain/devices/queries/devices';

export default function DeviceDetailContents({ id }: Readonly<{ id: string }>) {
  // queries
  const { device, isLoading } = useDevice(id);

  if (!device && !isLoading) {
    return notFound();
  }

  return <div className="flex size-full flex-col gap-3"></div>;
}
