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
