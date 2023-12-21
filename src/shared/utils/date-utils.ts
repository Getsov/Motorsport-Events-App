export function getDayOfWeek(dateString: string): string {
  const daysOfWeek = [
    'Неделя',
    'Понеделник',
    'Вторник',
    'Сряда',
    'Четвъртък',
    'Петък',
    'Събота',
  ];

  const parts = dateString.split('.');
  const compatibleDateString = `${parts[2]}-${parts[1]}-${parts[0]}`;

  const date = new Date(compatibleDateString);

  if (!isNaN(date.getTime())) {
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  } else {
    return 'Invalid Date';
  }
}

export function getHourFromWheelPicker(date: string): string {
  if (date.length === 5) {
    return date;
  }

  const dateTime = new Date(date);

  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();

  return `${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}`;
}
