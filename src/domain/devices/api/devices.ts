import api from '@/shared/api';
import dayjs from '@/shared/dayjs';
import delay from '@/utils/delay';

export async function getDashboard() {
  return api.get('/api/devices/dashboard').json<DeviceDashboard>();
}

export async function getDevices(params: DeviceSearchRequest, pageParams: PageRequest) {
  const result = await api.get('/api/devices', { searchParams: { ...params, ...pageParams } }).json<Page<Device>>();

  await delay(100);

  return result;
}

export async function getDevice(id: string) {
  return api.get(`/api/devices/${id}`).json<Device>();
}

export async function registerDevice(req: DeviceRegisterRequest) {
  const result = await api
    .post('/api/devices', { json: { ...req, purchaseDate: dayjs(req.purchaseDate).format('YYYY-MM-DD') } })
    .json<Device>();

  await delay(100);

  return result;
}

export async function updateDevice(id: string, req: DeviceUpdateRequest) {
  return api.put(`/api/devices/${id}`, { json: req }).json<Device>();
}
