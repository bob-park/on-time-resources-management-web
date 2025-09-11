import BackButton from '@/shared/components/btn/BackButton';

import DeviceDetailContents from './_components/DeviceDetailContents';

export default async function DeviceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="flex size-full flex-col gap-5">
      {/* title */}
      <div className="flex w-full flex-row items-center gap-3">
        <div className="">
          <BackButton />
        </div>
        <h2 className="text-2xl">기기 상세</h2>
      </div>

      {/* contents */}
      <div className="flex w-full flex-col gap-3">
        <div className="w-full">
          <DeviceDetailContents id={id} />
        </div>
      </div>
    </div>
  );
}
