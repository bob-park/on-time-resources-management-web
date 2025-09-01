'use client';

import { TiWarning } from 'react-icons/ti';

import { useDeviceDashboard } from '@/domain/devices/queries/devices';

import ReactECharts from 'echarts-for-react';

export default function Home() {
  // queries
  const { dashboard } = useDeviceDashboard();

  const deviceCategoryData = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: '기기 현황',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: [
          { name: '노트북', value: dashboard?.category.laptop || 0 },
          { name: '데스크탑', value: dashboard?.category.desktop || 0 },
          { name: '모니터', value: dashboard?.category.monitor || 0 },
          { name: '서버', value: dashboard?.category.server || 0 },
          { name: 'TV', value: dashboard?.category.tv || 0 },
          { name: 'ETC', value: dashboard?.category.etc || 0 },
        ],
      },
    ],
  };
  const deviceStatusData = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: '기기 상태',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: [
          { name: '사용중', value: dashboard?.status.used || 0 },
          { name: '대기', value: dashboard?.status.waiting || 0 },
          { name: '반출', value: dashboard?.status.export || 0 },
          { name: '수리', value: dashboard?.status.repairing || 0 },
          { name: '고장', value: dashboard?.status.broken || 0 },
          { name: '분실', value: dashboard?.status.lost || 0 },
        ],
      },
    ],
  };

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      {/* 기기 현황 */}
      <div className="flex w-full flex-col gap-3">
        {/* title */}
        <div className="">
          <h2 className="text-2xl font-bold">기기 현황</h2>
        </div>

        {/* content  */}
        <div className="flex w-full flex-row items-center gap-5">
          {/* 총 기기 수 */}
          <div className="card bg-base-300 card-md flex-1 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">총 기기</h2>
              <div className="flex w-full flex-col gap-3">
                <p className="text-xl font-bold">{dashboard?.total || 0} 개</p>
                <p className="h-6 text-base font-semibold text-gray-600"> </p>
              </div>
            </div>
          </div>

          {/* 사용 기기 수 */}
          <div className="card bg-base-300 card-md flex-1 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">사용 기기</h2>
              <div className="flex w-full flex-col gap-3">
                <p className="text-xl font-bold">{dashboard?.status.used || 0} 개</p>
                <p className="text-base font-semibold text-gray-600">대기 기기: {dashboard?.status.waiting} 개</p>
              </div>
            </div>
          </div>

          <div className="card bg-base-300 card-md flex-1 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">사용 S/W</h2>
              <div className="flex w-full flex-col gap-3">
                <p className="text-xl font-bold">0 개</p>
                <p className="text-base font-semibold text-gray-600">대기 S/W: 0 개</p>
              </div>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>

        {/*  chart */}
        <div className="flex flex-row items-center gap-5">
          {/* 기기 카테고리 */}
          <div className="card bg-base-300 card-md flex-1 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">기기 카테고리</h2>
              <div className="flex w-full flex-col gap-3">
                <ReactECharts option={deviceCategoryData} theme="dark" opts={{ renderer: 'canvas' }} />
              </div>
            </div>
          </div>

          {/* 기기 현황 */}
          <div className="card bg-base-300 card-md flex-1 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">기기 상태</h2>
              <div className="flex w-full flex-col gap-3">
                <ReactECharts
                  className="size-full"
                  option={deviceStatusData}
                  theme="dark"
                  opts={{ renderer: 'canvas' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 고장 / 수리 */}
        <div className="flex w-full flex-row items-center gap-5">
          {/* 총 기기 수 */}
          <div className="card bg-base-300 card-md flex-2/3 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">
                <TiWarning className="inline size-6 text-yellow-300" />
                고장 / 수리 중인 기기
              </h2>
              <div className="flex w-full flex-col gap-3">
                <div className="flex flex-row gap-3">
                  <strong className="w-48 flex-none text-center">관리 번호</strong>
                  <strong className="w-32 flex-none text-center">소유자</strong>
                  <strong className="w-24 flex-none text-center">상태</strong>
                </div>
                <div className="flex flex-col gap-1"></div>
              </div>
            </div>
          </div>

          <div className="flex-1/3"></div>
        </div>
      </div>
    </div>
  );
}
