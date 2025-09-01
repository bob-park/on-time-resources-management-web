'use client';

import { useEffect, useRef, useState } from 'react';

import DeviceStatus from '@/domain/devices/components/DeviceStatus';
import DeviceTypeIcon from '@/domain/devices/components/DeviceTypeIcon';
import { useDevices } from '@/domain/devices/queries/devices';
import TimeAgoKo from '@/shared/components/timeago';
import dayjs from '@/shared/dayjs';

export default function DeviceListContents() {
  // ref
  const hasMoreRef = useRef<HTMLDivElement>(null);

  // state
  const [searchParams, setSearchParams] = useState<DeviceSearchRequest>({});

  // queries
  const { devices, fetchNextPage, hasNextPage, page, isLoading, isFetchingNextPage } = useDevices(searchParams);

  console.log(isFetchingNextPage);

  // useEffect
  useEffect(() => {
    const observer = new IntersectionObserver(() => fetchNextPage());

    hasNextPage && hasMoreRef.current && observer.observe(hasMoreRef.current);

    return () => {
      hasMoreRef.current && observer.unobserve(hasMoreRef.current);
    };
  }, [hasNextPage]);

  return (
    <div className="flex size-full flex-col gap-3">
      {/* search form */}
      <div className="w-full"></div>

      {/* search result */}
      <div className="flex w-full flex-col items-center gap-3">
        {/* headers */}
        <div className="grid size-full grid-cols-18 items-center justify-center gap-3 px-4">
          <div className="col-span-2">
            <p className="text-center">종류</p>
          </div>
          <div className="col-span-5">
            <p className="text-center">장치 이름</p>
          </div>
          <div className="col-span-5">
            <p className="text-center">모델</p>
          </div>
          <div className="col-span-2">
            <p className="text-center">소유자</p>
          </div>
          <div className="col-span-2">
            <p className="text-center">상태</p>
          </div>
          <div className="col-span-2">
            <p className="text-center">구매일</p>
          </div>
        </div>

        {/* contents */}
        {devices.map((device) => (
          <div
            key={`key-device-list-item-${device.id}`}
            className="hover:bg-base-300 grid w-full grid-cols-18 gap-3 rounded-xl px-4 py-2 transition-all duration-300 hover:cursor-pointer"
          >
            <div className="col-span-2">
              <div className="flex h-full items-center justify-center">
                <DeviceTypeIcon type={device.deviceType} />
              </div>
            </div>
            <div className="col-span-5">
              <div className="flex h-full items-center justify-center">
                <div className="tooltip w-full" data-tip={device.name}>
                  <p className="w-full truncate">{device.name}</p>
                </div>
              </div>
            </div>
            <div className="col-span-5">
              <div className="flex flex-col gap-1">
                <p className="w-full">{device.manufacturer}</p>
                <div className="tooltip w-fit max-w-full" data-tip={device.model}>
                  <p className="w-full truncate text-sm text-gray-500">{device.model}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2"></div>
            <div className="col-span-2">
              <div className="flex h-full items-center justify-center">
                <DeviceStatus status={device.status} />
              </div>
            </div>
            <div className="col-span-2">
              <div
                className="tooltip flex h-full items-center justify-center"
                data-tip={dayjs(device.purchaseDate).format('YYYY-MM-DD')}
              >
                <TimeAgoKo datetime={device.purchaseDate} />
              </div>
            </div>
          </div>
        ))}

        {/* isLoading */}
        {(isFetchingNextPage || isLoading) && (
          <div className="my-10 flex w-full items-center justify-center">
            <span className="loading loading-dots loading-xl" />
          </div>
        )}

        {/* more item */}
        {hasNextPage && (!isFetchingNextPage || !isLoading) && (
          <div ref={hasMoreRef} className="flex w-full items-center justify-center"></div>
        )}
      </div>
    </div>
  );
}
