'use client';

import { useEffect, useState } from 'react';

import { IoIosAdd } from 'react-icons/io';
import { RiMiniProgramLine } from 'react-icons/ri';

import { useRouter } from 'next/navigation';

import SoftwareStatus from '@/domain/software/components/SoftwareStatus';
import { useSoftware } from '@/domain/software/queries/software';
import TimeAgoKo from '@/shared/components/timeago';
import dayjs from '@/shared/dayjs';
import useInfinityScroll from '@/shared/hooks/useInfinityScroll';

import { overlay } from 'overlay-kit';

import SoftwareRegisterModal from './SoftwareRegisterModal';

export default function SoftwareListContents({
  querySearchParams,
}: Readonly<{ querySearchParams: SoftwareSearchRequest }>) {
  // state
  const [inputName, setInputName] = useState<string>('');
  const [searchParams, setSearchParams] = useState<SoftwareSearchRequest>(() => querySearchParams);

  // queries
  const { software, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, page } = useSoftware(searchParams, {
    page: 0,
    size: 15,
    sort: 'purchaseDate,desc',
  });

  // hooks
  const router = useRouter();
  const [hasMoreRef] = useInfinityScroll({
    hasMore: hasNextPage,
    onNext: async () => {
      await fetchNextPage();
    },
  });

  // useEffect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchParams((prev) => ({ ...prev, name: inputName }));
    }, 500);

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [inputName]);

  useEffect(() => {
    router.replace(`/software?${new URLSearchParams(searchParams).toString()}`);
  }, [searchParams]);

  // handle

  return (
    <div className="flex size-full flex-col gap-3">
      {/* search form */}
      <div className="w-full">
        {/* 이름 */}
        <div className="flex flex-col items-center gap-3">
          {/* field */}
          <div className="w-full">
            <p className="">S/W 이름</p>
          </div>

          <div className="flex h-14 w-full items-center">
            <label className="input input-lg">
              <RiMiniProgramLine className="size-5" />
              <input
                type="search"
                className="grow"
                placeholder="S/W"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
            </label>
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
                  <SoftwareRegisterModal
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
              S/W 등록
            </button>
          </div>
        </div>
      </div>

      {/* search result */}
      <div className="flex w-full flex-col items-center gap-3">
        {/* headers */}
        <div className="bg-base-300 grid size-full grid-cols-18 items-center justify-center gap-3 rounded-xl px-4 py-2">
          <div className="col-span-2">
            <p className="text-center">플랫폼</p>
          </div>
          <div className="col-span-4">
            <p className="text-center">S/W 이름</p>
          </div>
          <div className="col-span-5">
            <p className="text-center">정보</p>
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
        {software.map((item) => (
          <div
            key={`key-software-list-item-${item.id}`}
            className="hover:bg-base-300 grid w-full cursor-pointer grid-cols-18 gap-3 rounded-xl px-4 py-2 transition-all duration-300"
          >
            <div className="col-span-2">
              <div className="flex h-full items-center justify-center">{item.platform}</div>
            </div>
            <div className="col-span-4">
              <div className="flex h-full w-full flex-col">
                <div className="tooltip w-fit max-w-full" data-tip={item.name}>
                  <p className="w-full truncate">{item.name}</p>
                </div>
                <p className="w-full text-sm text-gray-400">{item.description}</p>
              </div>
            </div>
            <div className="col-span-5">
              <div className="flex flex-col gap-1">
                <p className="w-full">{item.manufacturer}</p>
                <p className="h-5 text-xs text-gray-300">{item.licenseKey}</p>
              </div>
            </div>
            <div className="col-span-3"></div>
            <div className="col-span-2">
              <div className="flex h-full items-center justify-center">
                <SoftwareStatus status={item.status} />
              </div>
            </div>
            <div className="col-span-2">
              <div
                className="tooltip flex h-full items-center justify-center"
                data-tip={dayjs(item.purchaseDate).format('YYYY-MM-DD')}
              >
                <TimeAgoKo datetime={item.purchaseDate} />
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
