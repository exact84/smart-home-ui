import { Pipe, PipeTransform } from '@angular/core';
import { NO_CONTENT } from '../constants/no-content';

@Pipe({
  name: 'noContent',
})
export class NoContentPipe implements PipeTransform {
  transform<T>(value: T): T | string {
    return value ?? NO_CONTENT;
  }
}
