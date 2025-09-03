import api from '@/shared/api';
import delay from '@/utils/delay';

export async function getDashboard() {
  return api.get('/api/devices/dashboard').json<DeviceDashboard>();
}

export async function getDevice(params: DeviceSearchRequest, pageParams: PageRequest) {
  const result = await api.get('/api/devices', { searchParams: { ...params, ...pageParams } }).json<Page<Device>>();

  await delay(1_000);

  return result;
}
