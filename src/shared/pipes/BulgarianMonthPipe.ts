import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bgDateFormat',
})
export class BulgarianDateFormatPipe implements PipeTransform {
  transform(value: string): string {
    const months = [
      'Януари',
      'Февруари',
      'Март',
      'Април',
      'Май',
      'Юни',
      'Юли',
      'Август',
      'Септември',
      'Октомври',
      'Ноември',
      'Декември',
    ];

    const [day, monthIndex, year] = value.split('.');
    const month = months[parseInt(monthIndex, 10) - 1];

    return `${month} ${year}`;
  }
}
