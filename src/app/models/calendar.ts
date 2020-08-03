import { Month } from './month';
import { User } from './user';
import { Appointment } from './appointment';

export interface Calendar {
  months?: Month[];
  appointments?: Appointment[];
  users?: User[];
}
