import { Pipe, PipeTransform } from '@angular/core';
import { TimePipeService } from './time-pipe.service';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  constructor(private service: TimePipeService) { }

  transform(value: number, args?: any): any {
    return this.service.transform(value);
  }
}
