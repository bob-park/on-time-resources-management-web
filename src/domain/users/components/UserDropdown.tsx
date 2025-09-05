import { useState } from 'react';

import { FaCircle } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import UserAvatar from '@/domain/users/components/UserAvatar';

import cx from 'classnames';
import { v4 as uuid } from 'uuid';

const UserValue = ({ user }: Readonly<{ user?: User }>) => {
  if (!user) {
    return (
      <div className="flex h-8 w-fit flex-row items-center gap-2 px-4 py-2">
        <FaCircle className="size-5" />
        <span className="">전체</span>
      </div>
    );
  }

  return (
    <div className="flex h-full w-fit flex-row items-center gap-2">
      {/* user avatar */}
      <div className="">
        <UserAvatar src={`/api/users/${user.id}/avatar`} username={user.username} />
      </div>

      {/* user info */}
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div className="text-left text-sm font-semibold">{user.username}</div>
        </div>
        <div className="w-full">
          <p className="w-full text-xs text-wrap text-gray-500">{user.group?.name}</p>
        </div>
      </div>
    </div>
  );
};

interface UserDropdownProps {
  existAll?: boolean;
  users: User[];
  selectUser?: User;
  onChange?: (id?: string) => void;
}

export default function UserDropdown({ existAll = false, users, selectUser, onChange }: Readonly<UserDropdownProps>) {
  // state
  const [open, setOpen] = useState<boolean>(false);

  // handle
  const handleChange = (id?: string) => {
    setOpen(false);
    onChange?.(id);
  };

  return (
    <div className="group bg-base-300 relative flex min-w-48 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl px-4 py-[10px] shadow-lg select-none">
      {/* current value */}
      <div className="relative flex w-full flex-row items-center gap-2" onClick={() => setOpen(!open)}>
        <UserValue user={selectUser} />

        {/* dropdown */}
        <div className="absolute right-0">
          {open ? <IoIosArrowUp className="size-5" /> : <IoIosArrowDown className="size-5" />}
        </div>
      </div>

      <div
        className={cx(
          'bg-base-300 absolute top-14 z-10 max-h-96 w-48 overflow-y-auto rounded-xl p-1 shadow-lg',
          open ? 'visible' : 'invisible',
        )}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="hover:bg-base-100 flex w-full items-center rounded-xl p-3" onClick={() => handleChange()}>
            <UserValue />
          </div>

          {users.map((user) => (
            <div
              key={`users-dropdown-item-${uuid()}`}
              className="hover:bg-base-100 flex w-full items-center rounded-xl p-3"
              onClick={() => handleChange(user.id)}
            >
              <UserValue user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
