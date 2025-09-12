import api from '@/shared/api';
import delay from '@/utils/delay';

export async function getSoftware(params: SoftwareSearchRequest, pageParams: PageRequest) {
  return api.get('/api/software', { searchParams: { ...params, ...pageParams } }).json<Page<Software>>();
}

export async function registerSoftware(req: SoftwareRegisterRequest) {
  const result = await api.post('/api/software', { json: req }).json<Software>();

  await delay(1_000);

  return result;
}
