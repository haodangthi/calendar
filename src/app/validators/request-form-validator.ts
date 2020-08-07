import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Appointment } from '../models/appointment';
import { checkDate, getControlValues } from './helpers-for-validators';

export function requestFormValidator(appointments: Appointment[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control) {
      const { userId, startDate, endDate } = getControlValues(control);
      const userAppointments = appointments.filter(
        (app) => app.userId === userId
      );
      //debugger;
      return checkDate(userAppointments, startDate, endDate)
        ? { endDate: true }
        : null;
    }
    return null;
  };
}
