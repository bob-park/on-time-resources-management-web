import DeviceListContents from '@/app/devices/_components/DeviceListContents';

export default function DeviceListPage() {
  return (
    <div className="flex size-full flex-col gap-5">
      {/* title */}
      <div className="w-full">
        <h2 className="text-2xl">기기 목록</h2>
      </div>

      {/* contents */}
      <div className="w-full">
        <DeviceListContents />
      </div>
    </div>
  );
}
