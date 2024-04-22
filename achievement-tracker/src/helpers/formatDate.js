import { format } from 'date-fns';

export const formatDate = (dateObj) => {

  // Date FNS will automatically convert this to the local time zone. Which is amazing and I love it.
  const formattedDate = format(dateObj, 'yyyy-MM-dd');
  return formattedDate;
}