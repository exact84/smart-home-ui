import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sensorValue',
})
export class SensorValuePipe implements PipeTransform {
  transform(value: { amount: number | undefined; unit: string }): string {
    if (!value || value.amount === undefined) {
      return ' - ';
    }
    if (!value.unit || value.unit === undefined) {
      return value.amount.toString();
    }

    return `${value.amount} ${value.unit}`;
  }
}
