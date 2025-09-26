import { parseISO, format } from "date-fns";

export const DEFAULT_DATE_FORMAT = "yyyy-MM-dd HH:mm";

export const formatDateToLocalTime = (
  utcDateString: string,
  dateFormat = DEFAULT_DATE_FORMAT,
): string => {
  const date = parseISO(utcDateString);

  return format(date, dateFormat);
};
