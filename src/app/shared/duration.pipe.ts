import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number | string = 0): string {
    const numericValue = Number(value);
    const hours = Math.trunc(numericValue / 60);
    const minutes = numericValue % 60;
    return [hours ? `${hours}h` : '', minutes ? `${minutes}min` : '']
      .filter(v => v)
      .join(' ');
  }

}
