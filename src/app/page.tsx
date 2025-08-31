'use client';

import { useDeviceDashboard } from '@/domain/devices/queries/devices';

import { Cell, Pie, PieChart, ResponsiveContainer, Sector, SectorProps } from 'recharts';

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: { name: string };
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData;
const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042'];

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload?.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#999"
      >{`${payload?.name}: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${((percent ?? 1) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function Home() {
  // queries
  const { dashboard } = useDeviceDashboard();

  const data = [
    { name: '사용중', value: dashboard?.status.used || 0 },
    { name: '대기', value: dashboard?.status.waiting || 0 },
    { name: '고장', value: dashboard?.status.broken || 0 },
    { name: '수리', value: dashboard?.status.repairing || 0 },
    { name: '반출', value: dashboard?.status.export || 0 },
    { name: '분실', value: dashboard?.status.lost || 0 },
  ];

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
          <div className="card bg-base-300 card-md w-48 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">총 기기 수</h2>
              <div className="flex w-full flex-col gap-3">
                <p className="text-xl font-bold">{dashboard?.total || 0} 개</p>
                <p className="h-6 text-base font-semibold text-gray-600"> </p>
              </div>
            </div>
          </div>

          {/* 사용 기기 수 */}
          <div className="card bg-base-300 card-md w-48 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">사용 기기 수</h2>
              <div className="flex w-full flex-col gap-3">
                <p className="text-xl font-bold">{dashboard?.status.used || 0} 개</p>
                <p className="text-base font-semibold text-gray-600">대기 기기 수: {dashboard?.status.waiting} 개</p>
              </div>
            </div>
          </div>
        </div>

        {/*  chart */}
        <div className="flex flex-row items-center gap-5">
          {/* 기기 카테고리 */}
          <div className="card bg-base-300 card-md flex-1 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">기기 카테고리</h2>
              <div className="flex h-[400px] w-full flex-col gap-3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      activeShape={renderActiveShape}
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 기기 현황 */}
          <div className="card bg-base-300 card-md flex-1 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-gray-400">기기 현황</h2>
              <div className="flex w-full flex-col gap-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
