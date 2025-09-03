import DeviceListContents from './_components/DeviceListContents';
import DeviceSimpleResult from './_components/DeviceSimpleResult';

export default function DeviceListPage() {
  return (
    <div className="flex size-full flex-col gap-5">
      {/* title */}
      <div className="w-full">
        <h2 className="text-2xl">기기 목록</h2>
      </div>

      {/* contents */}
      <div className="flex w-full flex-col gap-3">
        <div className="w-full">
          <DeviceSimpleResult />
        </div>

        <div className="mt-2 w-full">
          <DeviceListContents />
        </div>
      </div>
    </div>
  );
}
