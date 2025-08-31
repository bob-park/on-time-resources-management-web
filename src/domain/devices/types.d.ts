type DeviceStatus = 'USED' | 'WAITING' | 'BROKEN' | 'REPAIRING' | 'LOST';
type DeviceType = 'NOTEBOOK' | 'DESKTOP' | 'SERVER' | 'TV' | 'MONITOR' | 'ETC';

interface Device {
  id: string;
  teamId?: string;
  deviceType: DeviceType;
  name: string;
  description: string;
  model: string;
  manufacturer?: string;
  serialNumber?: string;
  os?: string;
  osVersion?: string;
  cpu?: string;
  memory?: number;
  storage?: number;
  status: DeviceStatus;
  purchaseDate: Date;
  ipAddress?: string;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;
}

interface DeviceDashboard {
  total: number;
  status: {
    used: number;
    waiting: number;
    broken: number;
    repairing: number;
    export: number;
    lost: number;
  };
}

type DeviceSearchRequest = {
  teamId?: string;
  name?: string;
  description?: string;
  status?: DeviceStatus;
  deviceType?: DeviceType;
  model?: string;
  manufacturer?: string;
  serialNumber?: string;
};
