'use client';

import { notFound } from 'next/navigation';

import { useDevice } from '@/domain/devices/queries/devices';
import { formatDataSize } from '@/utils/dataSizeUtils';

export default function DeviceDetailContents({ id }: Readonly<{ id: string }>) {
  // queries
  const { device, isLoading } = useDevice(id);

  if (!device && !isLoading) {
    return notFound();
  }

  return (
    <div className="flex size-full flex-col gap-10">
      <div className="w-full">
        <div className="card bg-base-300 card-lg w-full shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              장비 정보 <span className="text-gray-300"> - {device?.name}</span>
            </h2>

            {/* contents */}
            <div className="mt-3 flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-row items-center justify-between gap-3">
                {/* 제조사 */}
                <div className="flex w-full flex-col gap-2">
                  <p className="w-full text-lg font-bold text-gray-400">제조사</p>
                  <p className="w-full text-xl">{device?.manufacturer}</p>
                </div>

                {/* 모델 */}
                <div className="flex w-full flex-col gap-2">
                  <p className="w-full text-lg font-bold text-gray-400">모델</p>
                  <p className="w-full text-xl">{device?.model}</p>
                </div>

                {/* 시리얼 번호 */}
                <div className="flex w-full flex-col gap-2">
                  <p className="w-full text-lg font-bold text-gray-400">시리얼 번호</p>
                  <p className="w-full text-xl">{device?.serialNumber}</p>
                </div>
              </div>

              <div className="flex w-full flex-row items-center justify-between gap-3">
                {/* CPU */}
                <div className="flex w-full flex-col gap-2">
                  <p className="w-full text-lg font-bold text-gray-400">CPU</p>
                  <p className="w-full text-xl">{device?.cpu}</p>
                </div>

                {/* Memory */}
                <div className="flex w-full flex-col gap-2">
                  <p className="w-full text-lg font-bold text-gray-400">Memory</p>
                  <p className="w-full text-xl">{formatDataSize(device?.memory ?? 0)}</p>
                </div>

                {/* Storage */}
                <div className="flex w-full flex-col gap-2">
                  <p className="w-full text-lg font-bold text-gray-400">용량</p>
                  <p className="w-full text-xl">{formatDataSize(device?.storage ?? 0)}</p>
                </div>
              </div>
            </div>

            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="card bg-base-300 card-lg w-full shadow-xl">
          <div className="card-body">
            <h2 className="card-title">사용 기록</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
