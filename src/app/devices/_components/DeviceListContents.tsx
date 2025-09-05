'use client';

import { useEffect, useRef, useState } from 'react';

import { IoIosAdd } from 'react-icons/io';
import { MdDevices, MdKey } from 'react-icons/md';
import { RiUserAddFill } from 'react-icons/ri';

import DeviceAssignModal from '@/app/devices/_components/DeviceAssignModal';
import DeviceStatusUpdater from '@/app/devices/_components/DeviceStatusUpdater';
import DeviceStatusSelect from '@/domain/devices/components/DeviceStatusSelect';
import DeviceTypeIcon from '@/domain/devices/components/DeviceTypeIcon';
import DeviceTypeSelect from '@/domain/devices/components/DeviceTypeSelect';
import { useDevices } from '@/domain/devices/queries/devices';
import UserAvatar from '@/domain/users/components/UserAvatar';
import TimeAgoKo from '@/shared/components/timeago';
import dayjs from '@/shared/dayjs';

import { overlay } from 'overlay-kit';

import DeviceRegisterModal from './DeviceRegisterModal';

export default function DeviceListContents() {
  // ref
  const hasMoreRef = useRef<HTMLDivElement>(null);

  // state
  const [inputModel, setInputModel] = useState<string>('');
  const [inputSerialNumber, setInputSerialNumber] = useState<string>('');
  const [searchParams, setSearchParams] = useState<DeviceSearchRequest>({
    teamId: '',
    deviceType: '',
    description: '',
    status: '',
    model: '',
    manufacturer: '',
    serialNumber: '',
    name: '',
  });

  // queries
  const { devices, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, page } = useDevices(searchParams, {
    size: 15,
    page: 0,
    sort: 'purchaseDate,desc',
  });

  // useEffect
  useEffect(() => {
    if (!hasMoreRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      async (entries) => {
        const isExecute = entries.every((entry) => entry.intersectionRatio === 1);

        if (isExecute) {
          await fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    hasNextPage ? observer.observe(hasMoreRef.current) : observer.unobserve(hasMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage]);

  // useEffect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchParams((prev) => ({ ...prev, model: inputModel }));
    }, 500);

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [inputModel]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchParams((prev) => ({ ...prev, serialNumber: inputSerialNumber }));
    }, 500);

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [inputSerialNumber]);

  // handle
  const handleAssignUser = (deviceId: string) => {
    overlay.open(({ isOpen, close, unmount }) => (
      <DeviceAssignModal
        deviceId={deviceId}
        open={isOpen}
        onClose={() => {
          close();
          setTimeout(() => {
            unmount();
          }, 500);
        }}
      />
    ));
  };

  return (
    <div className="flex size-full flex-col gap-3">
      {/* search form */}
      <div className="w-full">
        <div className="flex flex-row items-center gap-6">
          {/* 종류 */}
          <div className="flex flex-col items-center gap-3">
            {/* field */}
            <div className="w-full">
              <p className="">종류</p>
            </div>
            <DeviceTypeSelect
              value={searchParams.deviceType || undefined}
              onChange={(deviceType) => setSearchParams((prev) => ({ ...prev, deviceType: deviceType ?? '' }))}
            />
          </div>

          {/* 상태 */}
          <div className="flex flex-col items-center gap-3">
            {/* field */}
            <div className="w-full">
              <p className="">상태</p>
            </div>

            <DeviceStatusSelect
              value={searchParams.status || undefined}
              onChange={(status) => setSearchParams((prev) => ({ ...prev, status: status ?? '' }))}
            />
          </div>

          {/* 모델 */}
          <div className="flex flex-col items-center gap-3">
            {/* field */}
            <div className="w-full">
              <p className="">모델</p>
            </div>

            <div className="flex h-14 w-full items-center">
              <label className="input input-lg">
                <MdDevices className="size-5" />
                <input
                  type="search"
                  className="grow"
                  placeholder="Model"
                  value={inputModel}
                  onChange={(e) => setInputModel(e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* 시리얼 번호 */}
          <div className="flex flex-col items-center gap-3">
            {/* field */}
            <div className="w-full">
              <p className="">시리얼 번호</p>
            </div>

            <div className="flex h-14 w-full items-center">
              <label className="input input-lg">
                <MdKey className="size-5" />
                <input
                  type="search"
                  className="grow"
                  placeholder="Serial Number"
                  value={inputSerialNumber}
                  onChange={(e) => setInputSerialNumber(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-3 text-lg font-bold">
            <p className="">총 :</p>
            <p className="">
              {page.total} <span className="">개</span>
            </p>
          </div>

          {/* action */}
          <div className="">
            <button
              className="btn btn-lg btn-soft"
              onClick={() =>
                overlay.open(({ isOpen, close, unmount }) => (
                  <DeviceRegisterModal
                    open={isOpen}
                    onClose={() => {
                      close();
                      setTimeout(() => {
                        unmount();
                      }, 500);
                    }}
                  />
                ))
              }
            >
              <IoIosAdd className="size-6" />
              기기 등록
            </button>
          </div>
        </div>
      </div>

      {/* search result */}
      <div className="flex w-full flex-col items-center gap-3">
        {/* headers */}
        <div className="bg-base-300 grid size-full grid-cols-18 items-center justify-center gap-3 rounded-xl px-4 py-2">
          <div className="col-span-2">
            <p className="text-center">종류</p>
          </div>
          <div className="col-span-4">
            <p className="text-center">장치 이름</p>
          </div>
          <div className="col-span-5">
            <p className="text-center">모델</p>
          </div>
          <div className="col-span-3">
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
            <div className="col-span-4">
              <div className="flex h-full w-full items-center">
                <div className="tooltip w-fit max-w-full" data-tip={device.name}>
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
            <div className="tooltip col-span-3" data-tip={device.user ? '변경하기' : '할당하기'}>
              <div
                className="hover:bg-base-200 size-full rounded-xl px-4 transition-all duration-300"
                onClick={() => handleAssignUser(device.id)}
              >
                {device.user ? (
                  <div className="flex h-full w-fit flex-row items-center gap-2">
                    {/* user avatar */}
                    <div className="">
                      <UserAvatar src={`/api/users/${device.user.id}/avatar`} username={device.user.username} />
                    </div>

                    {/* user info */}
                    <div className="flex flex-col items-center">
                      <div className="w-full">
                        <div className="text-left text-sm font-semibold">{device.user.username}</div>
                      </div>
                      <div className="w-full">
                        <p className="w-full text-xs text-wrap text-gray-500">{device.user.group?.name}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <RiUserAddFill className="size-6" />
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex h-full items-center justify-center">
                <DeviceStatusUpdater device={device} />
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
          <div ref={hasMoreRef} className="flex h-6 w-full items-center justify-center"></div>
        )}
      </div>
    </div>
  );
}
