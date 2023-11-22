import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'dateFormatPipe'
})
export class dateFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const datePipe = new DatePipe("en-US");
        value = datePipe.transform(value, 'dd/MM/yyyy');
        return value;
  }

}
