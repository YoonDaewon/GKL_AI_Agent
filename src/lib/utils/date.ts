/**
 * Converts a date to GMT+0000 timezone while preserving year, month, and day,
 * and setting time to midnight (00:00:00)
 * @param date - Date in any timezone
 * @returns Date in GMT+0000 timezone with time set to midnight
 */
export function toGMTMidnight(date: Date): Date {
  // Create a new date object to avoid mutating the input
  const utcDate = new Date(date);

  // Get the date components in local time
  const year = utcDate.getFullYear();
  const month = utcDate.getMonth();
  const day = utcDate.getDate();

  // Create a new date in GMT timezone with midnight time
  const gmtMidnight = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

  return gmtMidnight;
}
