import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id'; // untuk bahasa Indonesia

dayjs.extend(relativeTime);
dayjs.locale('id'); // ubah ke bahasa Indonesia

export const formatRelativeTime = (dateString: string) => {
  return dayjs(dateString).fromNow();
};
