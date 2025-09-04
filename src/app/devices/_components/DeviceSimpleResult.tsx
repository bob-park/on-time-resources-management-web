'use client';

import { FaCircle, FaRegHandPaper } from 'react-icons/fa';
import { GiBrokenPottery } from 'react-icons/gi';
import { LuLaptop } from 'react-icons/lu';
import { TiSpannerOutline } from 'react-icons/ti';

import { useDeviceDashboard } from '@/domain/devices/queries/devices';

export default function DeviceSimpleResult() {
  // queries
  const { dashboard } = useDeviceDashboard();

  return (
    <div className="flex size-full flex-col items-center gap-3">
      {/* contents */}
      <div className="w-full">
        <div className="flex flex-row items-center gap-4">
          <div className="card bg-base-300 card-md flex-1 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">
                <FaCircle className="size-5" /> 총 기기
              </h2>
              <div className="flex w-full flex-row items-center gap-3">
                <p className="text-4xl font-bold">{dashboard?.total || 0}</p>
              </div>
            </div>
          </div>
          <div className="card bg-base-300 card-md flex-1 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">
                <LuLaptop className="size-5" />
                사용
              </h2>
              <div className="flex w-full flex-row items-center gap-3">
                <p className="text-4xl font-bold">{dashboard?.status.used || 0}</p>
              </div>
            </div>
          </div>
          <div className="card bg-base-300 card-md flex-1 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">
                <FaRegHandPaper className="size-5" />
                대기
              </h2>
              <div className="flex w-full flex-row items-center gap-3">
                <p className="text-4xl font-bold">{dashboard?.status.waiting || 0}</p>
              </div>
            </div>
          </div>
          <div className="card bg-base-300 card-md flex-1 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">
                <GiBrokenPottery className="size-5" />
                고장
              </h2>
              <div className="flex w-full flex-row items-center gap-3">
                <p className="text-4xl font-bold">{dashboard?.status.broken || 0}</p>
              </div>
            </div>
          </div>
          <div className="card bg-base-300 card-md flex-1 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">
                <TiSpannerOutline className="size-5" />
                수리
              </h2>
              <div className="flex w-full flex-row items-center gap-3">
                <p className="text-4xl font-bold">{dashboard?.status.repairing || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
