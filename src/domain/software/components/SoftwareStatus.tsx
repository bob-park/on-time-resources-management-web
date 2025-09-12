export default function SoftwareStatus({ status }: Readonly<{ status: SoftwareStatus }>) {
  switch (status) {
    case 'USED':
      return <div className="badge badge-success">사용</div>;
    case 'WAITING':
      return <div className="badge badge-info">대기</div>;
    case 'EXPIRED':
      return <div className="badge badge-accent">만료</div>;
    default:
      return '';
  }
}
