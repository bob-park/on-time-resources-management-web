'use client';

import { PiDevicesFill } from 'react-icons/pi';
import { TbLayoutDashboardFilled } from 'react-icons/tb';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

import { useMe } from '@/domain/users/queries/users';

import cx from 'classnames';

import Title from './Title';

function isActive(segments: string[], menuSegments: string[]): boolean {
  if (menuSegments.length === 0) {
    return segments.length === 0;
  }

  return menuSegments.every((menuSegments) => segments.includes(menuSegments));
}

const NavMenuItem = ({
  title,
  href = '#',
  active = false,
  comingSoon = false,
}: {
  title: string;
  href?: string;
  active?: boolean;
  comingSoon?: boolean;
}) => {
  return (
    <li className="mt-1">
      <Link
        className={cx('flex flex-row items-center justify-between rounded-full', {
          'bg-base-200': active,
        })}
        href={href}
      >
        <span>{title}</span>
        {comingSoon && <div className="badge badge-sm badge-soft badge-secondary">준비중</div>}
      </Link>
    </li>
  );
};

const NavMenuList = ({
  children,
  title,
  icon,
}: Readonly<{ children: React.ReactNode; title: string; icon?: React.ReactNode }>) => {
  return (
    <ul className="menu w-full">
      <li>
        <details open>
          <summary className="rounded-full">
            {icon}
            <span className="">{title}</span>
          </summary>
          <ul>{children}</ul>
        </details>
      </li>
    </ul>
  );
};

export default function NavMenu({ shadow = false }: Readonly<{ shadow?: boolean }>) {
  // hooks
  const segments = useSelectedLayoutSegments();

  // queries
  const { me } = useMe();

  return (
    <nav
      className={cx('bg-base-300 flex size-full flex-col items-center gap-3 rounded-3xl px-4 py-1', {
        shadow: shadow,
      })}
    >
      {/* logo */}
      <div className="mt-2">
        <Title />
      </div>

      {/* menu */}
      <div className="size-full overflow-y-auto p-1">
        <div className="flex flex-col items-center justify-center">
          {/* dashboard menu */}
          <NavMenuList title="대시보드" icon={<TbLayoutDashboardFilled className="size-5" />}>
            <NavMenuItem title="대시보드" href="/" active={isActive(segments, [])} />
          </NavMenuList>

          {/* device menu */}
          <div className="mt-5 w-full pl-3">
            <span className="text-sm text-gray-500">기기</span>
          </div>
          <NavMenuList title="기기 관리" icon={<PiDevicesFill className="size-5" />}>
            <NavMenuItem title="기기 목록" />
          </NavMenuList>
        </div>
      </div>
    </nav>
  );
}
