export default function DeviceTypeIcon({ type }: Readonly<{ type: DeviceType }>) {
  switch (type) {
    case 'LAPTOP':
      return <div className="badge badge-soft badge-primary">노트북</div>;
    case 'DESKTOP':
      return <div className="badge badge-soft badge-primary">데스크탑</div>;
    case 'MONITOR':
      return <div className="badge badge-soft badge-primary">모니터</div>;
    case 'TV':
      return <div className="badge badge-soft badge-primary">TV</div>;
    case 'SERVER':
      return <div className="badge badge-soft badge-primary">서버</div>;
    default:
      return <div className="badge badge-soft badge-warning">기타</div>;
  }
}
