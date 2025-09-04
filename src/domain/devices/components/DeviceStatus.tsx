export default function DeviceStatus({ status }: Readonly<{ status: DeviceStatus }>) {
  switch (status) {
    case 'USED':
      return <div className="badge badge-success">사용</div>;
    case 'WAITING':
      return <div className="badge badge-info">대기</div>;
    case 'BROKEN':
      return <div className="badge badge-accent">고장</div>;
    case 'LOST':
      return <div className="badge badge-warning">분실</div>;
    case 'REPAIRING':
      return <div className="badge badge-error">수리</div>;
    case 'EXPORT':
      return <div className="badge badge-neutral">반출</div>;
    default:
      return '';
  }
}
