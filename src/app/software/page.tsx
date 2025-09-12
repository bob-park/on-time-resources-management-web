import SoftwareListContents from './_components/SoftwareListContents';

export default async function SoftwareListPage({ searchParams }: { searchParams: Promise<SoftwareSearchRequest> }) {
  const searchRequest = await searchParams;

  return (
    <div className="flex size-full flex-col gap-5">
      {/* title */}
      <div className="w-full">
        <h2 className="text-2xl">소프트웨어 목록</h2>
      </div>

      {/* contents */}
      <div className="flex w-full flex-col gap-3">
        <div className="w-full">
          <SoftwareListContents querySearchParams={searchRequest} />
        </div>
      </div>
    </div>
  );
}
