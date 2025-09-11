'use client';

import { IoArrowBack } from 'react-icons/io5';

import { useRouter } from 'next/navigation';

export default function BackButton({ onClick }: Readonly<{ onClick?: () => void }>) {
  // hooks
  const router = useRouter();

  // handle
  const handleClick = () => {
    router.back();

    onClick?.();
  };

  return (
    <button className="btn btn-ghost btn-circle size-12" onClick={handleClick}>
      <IoArrowBack className="size-6" />
    </button>
  );
}
