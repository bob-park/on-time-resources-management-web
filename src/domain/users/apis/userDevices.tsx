import api from '@/shared/api';
import dayjs from '@/shared/dayjs';
import delay from '@/utils/delay';

export async function provideUserDevice({
  id,
  deviceId,
  body,
}: {
  id: string;
  deviceId: string;
  body: { startDate: Date; endDate?: Date };
}) {
  const result = await api
    .post(`/api/users/${id}/devices/${deviceId}`, {
      json: {
        startDate: dayjs(body.startDate).format('YYYY-MM-DD'),
        endDate: body.endDate ? undefined : dayjs(body.endDate).format('YYYY-MM-DD'),
      },
    })
    .json<Device>();

  await delay(100);

  return result;
}
