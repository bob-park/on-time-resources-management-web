'use client';

import { useEffect, useRef } from 'react';

import { MdDevices } from 'react-icons/md';

import DeviceTypeSelect from '@/domain/devices/components/DeviceTypeSelect';
import DataSizeInput, { DataSizeUnit, toBytes } from '@/shared/components/size/DataSizeInput';
import dayjs from '@/shared/dayjs';
import useInputFields, { InputField } from '@/shared/hooks/useInputFields';
import { getDaysOfWeek } from '@/utils/date';

import { DateRange, DayPicker } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import 'react-day-picker/style.css';

const defaultInputFields: InputField[] = [
  {
    field: 'deviceType',
    value: 'LAPTOP',
    required: true,
  },
  {
    field: 'name',
    required: true,
  },
  {
    field: 'description',
    required: false,
  },
  {
    field: 'model',
    required: true,
  },
  {
    field: 'manufacturer',
    required: true,
  },
  {
    field: 'serialNumber',
    required: false,
  },
  {
    field: 'os',
    required: false,
  },
  {
    field: 'osVersion',
    required: false,
  },
  {
    field: 'cpu',
    required: false,
  },
  {
    field: 'memory',
    required: false,
  },
  {
    field: 'storage',
    required: false,
  },
  {
    field: 'purchaseDate',
    required: true,
  },
];

export default function DeviceRegisterModal({
  open = false,
  onClose,
}: Readonly<{ open?: boolean; onClose?: () => void }>) {
  // ref
  const dialogRef = useRef<HTMLDialogElement>(null);

  // hooks
  const { valid, onInputChange, onInputValue } = useInputFields(defaultInputFields);

  // useEffect
  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }

    open ? dialogRef.current.showModal() : dialogRef.current.close();
  }, [open]);

  // handle
  const handleKeyboardDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      handleBackdrop();
    }
  };

  const handleBackdrop = () => {
    onClose?.();
  };

  const handleSubmit = () => {
    const memoryToken = (onInputValue('memory') || '0,GB').split(',');
    const storageToken = (onInputValue('storage') || '0,GB').split(',');

    const req: DeviceRegisterRequest = {
      deviceType: onInputValue('deviceType') as DeviceType,
      name: onInputValue('name'),
      description: onInputValue('description'),
      model: onInputValue('model'),
      manufacturer: onInputValue('manufacturer'),
      serialNumber: onInputValue('serialNumber'),
      os: onInputValue('os'),
      osVersion: onInputValue('osVersion'),
      cpu: onInputValue('cpu'),
      memory: toBytes(Number(memoryToken[0]), memoryToken[1] as DataSizeUnit),
      storage: toBytes(Number(storageToken[0]), storageToken[1] as DataSizeUnit),
      purchaseDate: dayjs(onInputValue('purchaseDate') || new Date())
        .startOf('day')
        .toDate(),
    };

    console.log(valid, req);
  };

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle" onKeyDownCapture={handleKeyboardDown}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">기기 등록</h3>

        {/* contents */}
        <div className="mt-5 flex flex-col gap-6">
          <div className="flex flex-row items-center gap-4">
            {/* 종류 */}
            <div className="flex flex-col items-center gap-3">
              {/* field */}
              <div className="w-full">
                <p className="text-xs">
                  종류 <span className="ml-1 font-bold text-red-400">*</span>
                </p>
              </div>
              <DeviceTypeSelect
                existAll={false}
                value={onInputValue('deviceType') as DeviceType}
                onChange={(deviceType) => onInputChange({ field: 'deviceType', value: deviceType })}
              />
            </div>

            {/* 구입일 */}
            <div className="flex flex-1 flex-col items-center gap-3">
              {/* field */}
              <div className="w-full">
                <p className="text-xs">
                  구입일 <span className="ml-1 font-bold text-red-400">*</span>
                </p>
              </div>
              <div className="w-full">
                <button className="w-full rounded-lg border p-3 text-center font-bold" popoverTarget="rdp-popover">
                  <span>{dayjs(onInputValue('purchaseDate') || new Date()).format('YYYY-MM-DD')}</span>
                  <span className="ml-2">
                    <span>(</span>
                    <span>{getDaysOfWeek(dayjs(onInputValue('purchaseDate') || new Date()).day())}</span>
                    <span>)</span>
                  </span>
                </button>
                <div className="dropdown" popover="auto" id="rdp-popover">
                  <DayPicker
                    className="react-day-picker"
                    animate
                    locale={ko}
                    mode="single"
                    captionLayout="dropdown-years"
                    selected={dayjs(onInputValue('purchaseDate') || new Date()).toDate()}
                    onSelect={(value) => value && onInputChange({ field: 'purchaseDate', value: value.toISOString() })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 이름 */}
          <div className="flex flex-col items-center gap-1">
            {/* field */}
            <div className="w-full">
              <p className="text-xs">
                기기명 <span className="ml-1 font-bold text-red-400">*</span>
              </p>
            </div>

            <div className="flex w-full items-center">
              <label className="input w-full">
                <MdDevices className="size-5" />
                <input
                  type="search"
                  className="grow"
                  placeholder="Name"
                  value={onInputValue('name')}
                  onChange={(e) => onInputChange({ field: 'name', value: e.target.value })}
                />
              </label>
            </div>
          </div>

          <div className="flex w-full flex-row items-center gap-2">
            {/* 제조사 */}
            <div className="flex flex-col items-center gap-1">
              {/* field */}
              <div className="w-full">
                <p className="text-xs">
                  제조사 <span className="ml-1 font-bold text-red-400">*</span>
                </p>
              </div>

              <div className="flex w-full items-center">
                <label className="input">
                  <MdDevices className="size-5" />
                  <input
                    type="search"
                    className="grow"
                    placeholder="Manufacturer"
                    value={onInputValue('manufacturer')}
                    onChange={(e) => onInputChange({ field: 'manufacturer', value: e.target.value })}
                  />
                </label>
              </div>
            </div>

            {/* 모델 */}
            <div className="flex flex-col items-center gap-1">
              {/* field */}
              <div className="w-full">
                <p className="text-xs">
                  모델 <span className="ml-1 font-bold text-red-400">*</span>
                </p>
              </div>

              <div className="flex w-full items-center">
                <label className="input">
                  <MdDevices className="size-5" />
                  <input
                    type="search"
                    className="grow"
                    placeholder="Model"
                    value={onInputValue('model')}
                    onChange={(e) => onInputChange({ field: 'model', value: e.target.value })}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-row items-center gap-2">
            {/* cpu */}
            <div className="flex flex-col items-center gap-1">
              {/* field */}
              <div className="w-full">
                <p className="text-xs">CPU</p>
              </div>

              <div className="flex w-full items-center">
                <label className="input w-full">
                  <MdDevices className="size-5" />
                  <input
                    type="search"
                    className="grow"
                    placeholder="CPU"
                    value={onInputValue('cpu')}
                    onChange={(e) => onInputChange({ field: 'cpu', value: e.target.value })}
                  />
                </label>
              </div>
            </div>

            {/* serial number */}
            <div className="flex flex-col items-center gap-1">
              {/* field */}
              <div className="w-full">
                <p className="text-xs">시리얼 번호</p>
              </div>

              <div className="flex w-full items-center">
                <label className="input">
                  <MdDevices className="size-5" />
                  <input
                    type="search"
                    className="grow"
                    placeholder="Serial Number"
                    value={onInputValue('serialNumber')}
                    onChange={(e) => onInputChange({ field: 'serialNumber', value: e.target.value })}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-row items-center gap-6">
            {/* memory */}
            <div className="flex flex-col items-center gap-1">
              {/* memory */}
              <div className="w-full">
                <p className="text-xs">메모리</p>
              </div>

              <div className="flex w-full items-center">
                <DataSizeInput
                  value={Number((onInputValue('memory') ?? '0,GB').split(',')[0] || 0)}
                  onChange={(value) => onInputChange({ field: 'memory', value: value })}
                />
              </div>
            </div>

            {/* storage */}
            <div className="flex flex-col items-center gap-1">
              {/* memory */}
              <div className="w-full">
                <p className="text-xs">스토리지</p>
              </div>

              <div className="flex w-full items-center">
                <DataSizeInput
                  value={Number((onInputValue('storage') ?? '0,GB').split(',')[0] || 0)}
                  onChange={(value) => onInputChange({ field: 'storage', value: value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* action */}
        <div className="modal-action">
          <button className="btn" onClick={handleBackdrop}>
            닫기
          </button>
          <button className="btn btn-neutral" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
    </dialog>
  );
}
