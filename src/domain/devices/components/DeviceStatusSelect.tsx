import { useState } from 'react';

import { FaCircle, FaRegHandPaper } from 'react-icons/fa';
import { GiBrokenPottery } from 'react-icons/gi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { LuLaptop } from 'react-icons/lu';
import { TbZoomCancel } from 'react-icons/tb';
import { TiSpannerOutline } from 'react-icons/ti';

import cx from 'classnames';

const DeviceStatusValue = ({ value }: { value?: DeviceStatus }) => {
  return (
    <div className="flex flex-row items-center gap-2 rounded-xl">
      {!value && (
        <>
          <FaCircle className="size-5" />
          <span className="">전체</span>
        </>
      )}
      {value === 'USED' && (
        <>
          <LuLaptop className="size-5" />
          <span className="">사용</span>
        </>
      )}
      {value === 'WAITING' && (
        <>
          <FaRegHandPaper className="size-5" />
          <span className="">대기</span>
        </>
      )}
      {value === 'BROKEN' && (
        <>
          <GiBrokenPottery className="size-5" />
          <span className="">고장</span>
        </>
      )}
      {value === 'REPAIRING' && (
        <>
          <TiSpannerOutline className="size-5" />
          <span className="">수리</span>
        </>
      )}
      {value === 'LOST' && (
        <>
          <TbZoomCancel className="size-5" />
          <span className="">분실</span>
        </>
      )}
    </div>
  );
};

interface DeviceStatusSelectProps {
  value?: DeviceStatus;
  onChange?: (status?: DeviceStatus) => void;
}

export default function DeviceStatusSelect({ value, onChange }: Readonly<DeviceStatusSelectProps>) {
  // state
  const [open, setOpen] = useState<boolean>(false);

  // handle
  const handleChange = (current?: DeviceStatus) => {
    setOpen(false);
    onChange?.(current);
  };

  return (
    <div className="group bg-base-300 relative flex min-w-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl p-4 shadow-lg select-none">
      {/* current value */}
      <div className="relative flex w-full flex-row items-center gap-2" onClick={() => setOpen(!open)}>
        <DeviceStatusValue value={value} />

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
        <div
          className="hover:bg-base-100 flex w-full items-center justify-center rounded-xl p-3"
          onClick={() => handleChange()}
        >
          <DeviceStatusValue />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center justify-center rounded-xl p-3"
          onClick={() => handleChange('USED')}
        >
          <DeviceStatusValue value="USED" />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center justify-center rounded-xl p-3"
          onClick={() => handleChange('WAITING')}
        >
          <DeviceStatusValue value="WAITING" />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center justify-center rounded-xl p-3"
          onClick={() => handleChange('BROKEN')}
        >
          <DeviceStatusValue value="BROKEN" />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center justify-center rounded-xl p-3"
          onClick={() => handleChange('REPAIRING')}
        >
          <DeviceStatusValue value="REPAIRING" />
        </div>
        <div
          className="hover:bg-base-100 flex w-full items-center justify-center rounded-xl p-3"
          onClick={() => handleChange('LOST')}
        >
          <DeviceStatusValue value="LOST" />
        </div>
      </div>
    </div>
  );
}
