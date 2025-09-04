'use client';

import useModal from '@/shared/hooks/useModal';

export default function DeviceAssignModal({
  open = false,
  onClose,
}: Readonly<{ open?: boolean; onClose?: () => void }>) {
  // hooks
  const { ref, onKeyDown, onBackdrop } = useModal({ open, onClose });

  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle" onKeyDownCapture={onKeyDown}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">소유자 변경</h3>

        {/* contents */}
        <div className="mt-5 flex flex-col gap-6"></div>

        {/* action */}
        <div className="modal-action">
          <button className="btn w-24" onClick={onBackdrop}>
            닫기
          </button>
          <button className="btn btn-neutral w-24">변경</button>
        </div>
      </div>
    </dialog>
  );
}
