'use client';

import { useState } from 'react';

import { FaCheck } from 'react-icons/fa6';

import UserAvatar from '@/domain/users/components/UserAvatar';
import { useUserDeviceProvide } from '@/domain/users/queries/userDevices';
import { useUsers } from '@/domain/users/queries/users';
import useModal from '@/shared/hooks/useModal';

import cx from 'classnames';
import dayjs from 'dayjs';

export default function DeviceAssignModal({
  deviceId,
  open = false,
  onClose,
}: Readonly<{ deviceId: string; open?: boolean; onClose?: () => void }>) {
  // state
  const [selectedId, setSelectedId] = useState<string>();

  // hooks
  const { ref, onKeyDown, onBackdrop } = useModal({ open, onClose });

  // queries
  const { users } = useUsers({ isDeleted: false }, { page: 0, size: 100, sort: 'username,asc' });
  const { provideUserDevice, isLoading } = useUserDeviceProvide({ onSuccess: () => onBackdrop() });

  // handle
  const handleSubmit = () => {
    if (!selectedId) {
      return;
    }

    provideUserDevice({
      id: selectedId,
      deviceId,
      body: {
        startDate: dayjs().toDate(),
      },
    });
  };

  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle" onKeyDownCapture={onKeyDown}>
      <div className="modal-box !max-w-80">
        <h3 className="text-lg font-bold">소유자 변경</h3>

        {/* contents */}
        <div className="mt-5 h-96 overflow-y-auto px-4">
          <div className="flex flex-col items-center justify-center gap-2">
            {users.map((user) => (
              <div
                key={`users-select-item-${user.id}`}
                className={cx(
                  'hover:bg-base-200 grid w-full cursor-pointer grid-cols-4 items-center justify-center gap-2 rounded-xl p-2 px-6 transition-all duration-300',
                  selectedId === user.id && 'bg-base-300',
                )}
                onClick={() => setSelectedId(selectedId === user.id ? undefined : user.id)}
              >
                <div className="col-span-1">
                  <div
                    className={cx(
                      'flex w-full items-center justify-center',
                      selectedId === user.id ? 'visible' : 'invisible',
                    )}
                  >
                    <FaCheck className="size-6 text-green-500" />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex h-full w-full flex-row items-center gap-2">
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
                        <p className="w-full text-xs text-gray-500">{user.group?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* action */}
        <div className="modal-action">
          <button className="btn w-24" onClick={onBackdrop}>
            닫기
          </button>
          <button className="btn btn-neutral w-24" disabled={isLoading || !selectedId} onClick={handleSubmit}>
            {isLoading ? <span className="loading loading-spinner" /> : '변경'}
          </button>
        </div>
      </div>
    </dialog>
  );
}
