'use client';

import { MdDevices } from 'react-icons/md';

import { useSoftwareRegister } from '@/domain/software/queries/software';
import dayjs from '@/shared/dayjs';
import useInputFields, { InputField } from '@/shared/hooks/useInputFields';
import useModal from '@/shared/hooks/useModal';
import { getDaysOfWeek } from '@/utils/date';

import { DayPicker } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import 'react-day-picker/style.css';

const defaultInputFields: InputField[] = [
  {
    field: 'name',
    required: true,
  },
  {
    field: 'description',
    required: false,
  },
  {
    field: 'manufacturer',
    required: true,
  },
  {
    field: 'licenseKey',
    required: false,
  },
  {
    field: 'purchaseDate',
    value: dayjs().format('YYYY-MM-DD'),
    required: true,
  },
];

export default function SoftwareRegisterModal({
  open = false,
  onClose,
}: Readonly<{ open?: boolean; onClose?: () => void }>) {
  // queries
  const { register, isLoading } = useSoftwareRegister({
    onSuccess: () => {
      onBackdrop();
    },
  });

  // hooks
  const { ref, onKeyDown, onBackdrop } = useModal({ open, onClose });
  const { valid, onInputChange, onInputValue } = useInputFields(defaultInputFields);

  const handleSubmit = () => {
    if (!valid) {
      return;
    }

    const req: SoftwareRegisterRequest = {
      platform: 'ETC',
      name: onInputValue('name'),
      description: onInputValue('description'),
      manufacturer: onInputValue('manufacturer'),
      licenseKey: onInputValue('licenseKey'),
      purchaseDate: dayjs(onInputValue('purchaseDate') || new Date())
        .startOf('day')
        .toDate(),
    };

    register(req);
  };

  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle" onKeyDownCapture={onKeyDown}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">S/W 등록</h3>

        {/* contents */}
        <div className="mt-5 flex flex-col gap-6">
          <div className="flex flex-row items-center gap-4">
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
                S/W 이름 <span className="ml-1 font-bold text-red-400">*</span>
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

          {/* description */}
          <div className="flex flex-col items-center gap-1">
            {/* field */}
            <div className="w-full">
              <p className="text-xs">설명</p>
            </div>

            <div className="flex w-full items-center">
              <label className="input w-full">
                <MdDevices className="size-5" />
                <input
                  type="search"
                  className="grow"
                  placeholder="Description"
                  value={onInputValue('description')}
                  onChange={(e) => onInputChange({ field: 'description', value: e.target.value })}
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
          </div>

          <div className="flex w-full flex-row items-center gap-2">
            {/* license key */}
            <div className="flex flex-col items-center gap-1">
              {/* field */}
              <div className="w-full">
                <p className="text-xs">라이센스 키</p>
              </div>

              <div className="flex w-full items-center">
                <label className="input">
                  <MdDevices className="size-5" />
                  <input
                    type="search"
                    className="grow"
                    placeholder="License Key"
                    value={onInputValue('licenseKey')}
                    onChange={(e) => onInputChange({ field: 'licenseKey', value: e.target.value })}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* action */}
        <div className="modal-action">
          <button className="btn w-24" onClick={onBackdrop}>
            닫기
          </button>
          <button className="btn btn-neutral w-24" disabled={!valid || isLoading} onClick={handleSubmit}>
            {isLoading ? <span className="loading loading-spinner" /> : '등록'}
          </button>
        </div>
      </div>
    </dialog>
  );
}
