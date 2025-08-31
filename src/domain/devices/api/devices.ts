import api from '@/shared/api';

export async function getDashboard() {
  return api.get('/api/devices/dashboard').json<DeviceDashboard>();
}

export async function getDevice(request: DeviceSearchRequest & PageRequest) {
  return api.get('/api/devices', { searchParams: request }).json<Page<Device>>();
}
