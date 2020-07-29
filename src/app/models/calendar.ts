import { Request } from './request';
import { Month } from './month';

export interface Calendar {
  months?: Month[];
  appointments?: Request[];
}
