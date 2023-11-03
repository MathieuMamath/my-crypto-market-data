import { format } from 'date-fns';

export const getDatetime = (timestamp: number): string => {
  const date = format(new Date(timestamp), 'yyyy/MM/dd HH:mm:ss');

  return date;
};