import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimePipeService {

  constructor() { }

  transform(value: number): string {
    if (value || value === 0) {
      return `${this.zeroPad(value, 2)}:00`;
    }
  }

  private zeroPad(num, places): string {
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }
}
