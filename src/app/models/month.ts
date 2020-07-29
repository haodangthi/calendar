import { Day } from './day';

export interface Month {
  name?: string;
  daysNumber?: number;
  days?: Day[];
}
