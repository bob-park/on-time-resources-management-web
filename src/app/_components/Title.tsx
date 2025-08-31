import Link from 'next/link';

export default function Title() {
  return (
    <Link className="btn btn-ghost rounded-full" href="/">
      <span className="bg-gradient-to-r from-white via-gray-500 to-gray-700 bg-clip-text text-xl font-bold text-transparent">
        사내 기기 관리
      </span>
    </Link>
  );
}
