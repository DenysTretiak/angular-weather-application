import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number | string): number | null {
    const celsius = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(celsius)) {
      return null;
    }

    return Number(celsius.toFixed(0));
  }

}
