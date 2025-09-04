'use client';

import { useState } from 'react';

import DeviceStatus from '@/domain/devices/components/DeviceStatus';
import { useDeviceUpdate } from '@/domain/devices/queries/devices';

import cx from 'classnames';

interface DeviceStatusUpdaterProps {
  device: Device;
}

export default function DeviceStatusUpdater({ device }: Readonly<DeviceStatusUpdaterProps>) {
  // state
  const [open, setOpen] = useState<boolean>(false);

  // queries
  const { updateDevice } = useDeviceUpdate(device.id, {});

  // handle
  const handleChange = (updateStatus: DeviceStatus) => {
    setOpen(false);

    updateDevice({ status: updateStatus });
  };

  return (
    <div className="group relative flex min-w-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl select-none">
      {/* current value */}
      <div className="relative flex w-full flex-row items-center justify-center gap-2" onClick={() => setOpen(!open)}>
        <DeviceStatus status={device.status} />
      </div>
      <div
        className={cx(
          'bg-base-300 absolute top-8 z-10 flex w-24 flex-col items-center justify-center gap-1 rounded-xl p-1 shadow-lg',
          open ? 'visible' : 'invisible',
        )}
      >
        <div
          className="hover:bg-base-100 flex w-full items-center justify-center rounded-xl p-3"
          onClick={() => handleChange('WAITING')}
        >
          <DeviceStatus status="WAITING" />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center justify-center rounded-xl p-3"
          onClick={() => handleChange('BROKEN')}
        >
          <DeviceStatus status="BROKEN" />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center justify-center rounded-xl p-3"
          onClick={() => handleChange('REPAIRING')}
        >
          <DeviceStatus status="REPAIRING" />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center justify-center rounded-xl p-3"
          onClick={() => handleChange('EXPORT')}
        >
          <DeviceStatus status="EXPORT" />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center justify-center rounded-xl p-3"
          onClick={() => handleChange('LOST')}
        >
          <DeviceStatus status="LOST" />
        </div>
      </div>
    </div>
  );
}
