import moment from 'moment-timezone';

export const getISOShort = (date: number | string | Date) => {
  return moment(date).format('YYYY-MM-DD');
};
