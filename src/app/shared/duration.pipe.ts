import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number = 0): string {
    const hours = Math.trunc(value / 60);
    const minutes = value % 60;
    return [hours ? `${hours}h` : '', minutes ? `${minutes}min` : '']
      .filter(v => v)
      .join(' ');
  }

}
