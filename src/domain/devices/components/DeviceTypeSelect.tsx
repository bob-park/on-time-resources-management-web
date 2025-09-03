import { useState } from 'react';

import { FaCircle, FaDesktop, FaLaptop } from 'react-icons/fa';
import { GrServerCluster } from 'react-icons/gr';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { LuMonitor } from 'react-icons/lu';
import { TbDeviceTv } from 'react-icons/tb';

import cx from 'classnames';

const DeviceTypeValue = ({ value }: Readonly<{ value?: DeviceType }>) => {
  return (
    <div className="flex flex-row items-center gap-2 rounded-xl">
      {!value && (
        <>
          <FaCircle className="size-5" />
          <span className="">전체</span>
        </>
      )}
      {value === 'LAPTOP' && (
        <>
          <FaLaptop className="size-5" />
          <span className="">노트북</span>
        </>
      )}
      {value === 'DESKTOP' && (
        <>
          <FaDesktop className="size-5" />
          <span className="">데스크탑</span>
        </>
      )}
      {value === 'MONITOR' && (
        <>
          <LuMonitor className="size-5" />
          <span className="">모니터</span>
        </>
      )}
      {value === 'SERVER' && (
        <>
          <GrServerCluster className="size-5" />
          <span className="">서버</span>
        </>
      )}
      {value === 'TV' && (
        <>
          <TbDeviceTv className="size-5" />
          <span className="">TV</span>
        </>
      )}
      {value === 'ETC' && (
        <>
          <IoInformationCircleOutline className="size-5" />
          <span className="">기타</span>
        </>
      )}
    </div>
  );
};

interface DeviceTypeSelectProps {
  value?: DeviceType;
  onChange?: (type?: DeviceType) => void;
}

export default function DeviceTypeSelect({ value, onChange }: Readonly<DeviceTypeSelectProps>) {
  // state
  const [open, setOpen] = useState<boolean>(false);

  // handle
  const handleChange = (current?: DeviceType) => {
    setOpen(false);
    onChange?.(current);
  };

  return (
    <div className="group bg-base-300 relative flex min-w-40 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl p-4 shadow-lg select-none">
      {/* current value */}
      <div className="relative flex w-full flex-row items-center gap-2" onClick={() => setOpen(!open)}>
        <DeviceTypeValue value={value} />

        {/* dropdown */}
        <div className="absolute right-0">
          {open ? <IoIosArrowUp className="size-5" /> : <IoIosArrowDown className="size-5" />}
        </div>
      </div>

      <div
        className={cx(
          'bg-base-300 absolute top-16 z-10 flex w-32 flex-col items-center justify-center gap-1 rounded-xl p-1 shadow-lg',
          open ? 'visible' : 'invisible',
        )}
      >
        <div className="hover:bg-base-100 flex w-full items-center rounded-xl p-3" onClick={() => handleChange()}>
          <DeviceTypeValue />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center rounded-xl p-3"
          onClick={() => handleChange('LAPTOP')}
        >
          <DeviceTypeValue value="LAPTOP" />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center rounded-xl p-3"
          onClick={() => handleChange('DESKTOP')}
        >
          <DeviceTypeValue value="DESKTOP" />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center rounded-xl p-3"
          onClick={() => handleChange('MONITOR')}
        >
          <DeviceTypeValue value="MONITOR" />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center rounded-xl p-3"
          onClick={() => handleChange('SERVER')}
        >
          <DeviceTypeValue value="SERVER" />
        </div>
        <div className="hover:bg-base-100 flex w-full items-center rounded-xl p-3" onClick={() => handleChange('TV')}>
          <DeviceTypeValue value="TV" />
        </div>
        <div className="hover:bg-base-100 flex w-full items-center rounded-xl p-3" onClick={() => handleChange('ETC')}>
          <DeviceTypeValue value="ETC" />
        </div>
      </div>
    </div>
  );
}
