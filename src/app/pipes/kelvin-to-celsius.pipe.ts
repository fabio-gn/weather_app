import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinToCelsius',
})
export class KelvinToCelsiusPipe implements PipeTransform {
  transform(value: number): number | null {
    if (value) {
      return value - 273.15;
    } else {
      return null;
    }
  }
}
