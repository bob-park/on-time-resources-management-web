'use client';

import {
  IoHelpCircleOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from 'react-icons/io5';

import UserAvatar from '@/domain/users/components/UserAvatar';
import { useMe } from '@/domain/users/queries/users';

import cx from 'classnames';

import Title from './Title';

interface HeaderProps {
  showNav?: boolean;
  onExtendClick?: () => void;
}

export default function Header({ showNav = false, onExtendClick }: Readonly<HeaderProps>) {
  // queries
  const { me } = useMe();

  // handle
  const handleExtendClick = () => {
    onExtendClick && onExtendClick();
  };

  return (
    <div className="navbar bg-base-300 items-center justify-between gap-5 rounded-3xl px-4 py-1">
      <div className="flex flex-row items-center gap-3">
        {/* nav menu toggle */}
        <div className="">
          <button className="btn btn-ghost btn-circle cursor-pointer" onClick={handleExtendClick}>
            <IoMenuOutline className="size-6" />
          </button>
        </div>

        {/* title */}
        <div className={cx(showNav && 'invisible')}>
          <Title />
        </div>
      </div>

      <div className="flex flex-row items-center gap-1">
        {/* notification */}
        <div className="relative">
          <button className="btn btn-ghost btn-circle cursor-pointer">
            <IoNotificationsOutline className="size-6" />
          </button>

          {/* unread indicator */}
          <div className="absolute top-1 right-2 flex size-3 items-center justify-center rounded-full bg-[#f5f7ff]">
            <div className="size-2 rounded-full bg-red-500" />
          </div>
        </div>

        {/* user profile */}
        <div className="w-44">
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost rounded-full px-4 py-2" tabIndex={0}>
              <div className="flex flex-row items-center justify-center gap-2">
                {/* user avatar */}
                <div className="">
                  <UserAvatar src={me && `/api/users/${me.id}/avatar`} username={me?.username ?? ''} />
                </div>

                {/* user info */}
                <div className="flex flex-col items-center">
                  <div className="w-full">
                    <div className="text-left text-sm font-semibold">{me?.username}</div>
                  </div>
                  <div className="-mt-1 w-full">
                    <span className="text-xs text-gray-400">{me?.group?.name}</span>
                  </div>
                </div>
              </div>
            </button>

            {/* TODO 각 메뉴 라우팅 설정  */}
            <ul tabIndex={0} className="menu dropdown-content rounded-box bg-base-300 z-[1] mt-4 w-48 p-2 shadow">
              <li>
                <a className="rounded-full" href="#">
                  <IoPersonOutline className="size-4" />
                  프로필
                </a>
              </li>
              <li>
                <a className="rounded-full" href="#">
                  <IoSettingsOutline className="size-4" />
                  설정
                </a>
              </li>
              <li>
                <a className="rounded-full" href="#">
                  <IoHelpCircleOutline className="size-4" />
                  Help
                </a>
              </li>
              <li className="border-[1px]" />
              <li>
                <a className="rounded-full text-red-500 hover:bg-red-900" href="/logout">
                  <IoLogOutOutline className="size-4" />
                  로그아웃
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
