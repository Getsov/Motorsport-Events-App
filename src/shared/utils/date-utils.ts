import { DatePipe } from '@angular/common';

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

export function transformDates(
  dates: { date: string; startTime: string; endTime: string }[]
) {
  return dates.map((date) => ({
    date: transformDateFormat(date.date),
    startTime: date.startTime,
    endTime: date.endTime,
  }));
}

function transformDateFormat(inputDate: string): string {
  const parts = inputDate.split('.');
  const [day, month, year] = parts;
  return `${year}.${month}.${day}`;
}

export function transformDateFromBackend(
  dates: { date: string; startTime: string; endTime: string }[]
) {
  const datePipe = new DatePipe('en-US');
  return dates.map((currentDate) => {
    const transformedDate = datePipe.transform(currentDate.date, 'dd.MM.yyyy')!;
    return {
      date: transformedDate,
      startTime: currentDate.startTime,
      endTime: currentDate.endTime,
    };
  });
}
