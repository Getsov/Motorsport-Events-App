export function getDayOfWeek(dateString: string): string {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const date = new Date(dateString);

  if (!isNaN(date.getTime())) {
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  } else {
    return 'Invalid Date';
  }
}
