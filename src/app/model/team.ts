import { ModelBase } from './model-base';

export interface Team extends ModelBase {
  name: string;
  group: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
}
