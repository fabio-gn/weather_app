import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToKmh',
})
export class MsToKmhPipe implements PipeTransform {
  transform(value: number): number | null {
    if (value) {
      return value * 3.6;
    }
    return null;
  }
}
