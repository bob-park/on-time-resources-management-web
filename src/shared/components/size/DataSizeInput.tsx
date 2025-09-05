import { useEffect, useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import cx from 'classnames';
import { v4 as uuid } from 'uuid';

export type DataSizeUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';

interface DataSizeInputProps {
  value: number;
  onChange?: (value: string) => void;
}

const DEFAULT_BYTES = 1_024;
const DATA_UNIT: DataSizeUnit[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

export function toBytes(value: number, unit: DataSizeUnit) {
  const index = DATA_UNIT.findIndex((dataUnit) => dataUnit === unit);

  return Math.pow(DEFAULT_BYTES, index < 0 ? 0 : index) * value;
}

export default function DataSizeInput({ value, onChange }: Readonly<DataSizeInputProps>) {
  // state
  const [open, setOpen] = useState<boolean>(false);
  const [unit, setUnit] = useState<DataSizeUnit>('GB');
  const [currentValue, setCurrentValue] = useState<number>(0);

  // useEffect
  useEffect(() => {
    handleChange(currentValue);
  }, [currentValue, unit]);

  // handle
  const handleChange = (value: number) => {
    const size = Math.min(value, 1_024);
    onChange?.(`${size},${unit}`);

    setCurrentValue(size);
  };

  return (
    <div className="flex size-full flex-row items-center justify-center gap-3">
      <input
        className="input text-right"
        type="number"
        value={value < 0 ? 0 : value}
        onChange={(e) => handleChange(Number(e.target.value))}
      />
      <div className="group bg-base-300 relative flex h-full w-24 flex-none cursor-pointer flex-col items-center justify-center gap-1 rounded-xl px-4 py-2 shadow-lg select-none">
        {/* current value */}
        <div className="relative flex w-full flex-row items-center gap-2" onClick={() => setOpen(!open)}>
          <p className="">{unit}</p>

          {/* dropdown */}
          <div className="absolute right-0">
            {open ? <IoIosArrowUp className="size-5" /> : <IoIosArrowDown className="size-5" />}
          </div>
        </div>

        <div
          className={cx(
            'bg-base-300 absolute bottom-12 z-10 flex w-24 flex-col items-center justify-center gap-1 rounded-xl p-1 shadow-lg',
            open ? 'visible' : 'invisible',
          )}
        >
          {DATA_UNIT.map((dataUnit) => (
            <div
              key={`data-size-input-unit-${uuid()}`}
              className="hover:bg-base-100 flex w-full items-center rounded-xl p-3"
              onClick={() => {
                setUnit(dataUnit);
                setOpen(false);
              }}
            >
              <p className="">{dataUnit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
