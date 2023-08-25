export const formatDate = (unixTimestamp: number): string => {
  const inputDate = new Date(unixTimestamp * 1000); // Convert the UNIX timestamp to milliseconds
  const now = new Date();

  const toUTCTimeString = (date: Date) => {
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  if (inputDate.getTime() > now.getTime()) {
    return `${inputDate.getUTCDate()}/${inputDate.getUTCMonth() + 1}/${String(
      inputDate.getUTCFullYear(),
    ).slice(2)} ${toUTCTimeString(inputDate)}`;
  }

  // If same day
  if (
    now.getUTCFullYear() === inputDate.getUTCFullYear() &&
    now.getUTCMonth() === inputDate.getUTCMonth() &&
    now.getUTCDate() === inputDate.getUTCDate()
  ) {
    return toUTCTimeString(inputDate);
  }

  // If yesterday
  const yesterday = new Date(Date.now() - 86400000);
  if (
    yesterday.getUTCFullYear() === inputDate.getUTCFullYear() &&
    yesterday.getUTCMonth() === inputDate.getUTCMonth() &&
    yesterday.getUTCDate() === inputDate.getUTCDate()
  ) {
    return `yesterday at ${toUTCTimeString(inputDate)}`;
  }

  // If same week
  const sundayOfTheWeek = new Date(now);
  sundayOfTheWeek.setUTCDate(now.getUTCDate() - now.getUTCDay());

  if (inputDate > sundayOfTheWeek) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return `${days[inputDate.getUTCDay()]} ${toUTCTimeString(inputDate)}`;
  }

  // If same month and same year
  if (
    now.getUTCFullYear() === inputDate.getUTCFullYear() &&
    now.getUTCMonth() === inputDate.getUTCMonth()
  ) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${months[inputDate.getUTCMonth()]} ${String(
      inputDate.getUTCDate(),
    ).padStart(2, '0')}, ${toUTCTimeString(inputDate)}`;
  }

  // If not the same year
  return `${inputDate.getUTCDate()}/${inputDate.getUTCMonth() + 1}/${String(
    inputDate.getUTCFullYear(),
  ).slice(2)} ${toUTCTimeString(inputDate)}`;
};
