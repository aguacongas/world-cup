import { ModelBase } from './model-base';
import { Result } from './result';

export interface Match extends ModelBase {
  date: Date;
  day: string;
  result1: Result;
  result2: Result;
}
