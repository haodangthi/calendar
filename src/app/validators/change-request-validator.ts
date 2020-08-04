import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Appointment } from '../models/appointment';
import { checkDate, getControlValues } from './helpers-for-validators';

export function changeRequestFormValidator(
  appointments: Appointment[]
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control) {
      //debugger;
      const { userId, startDate, endDate, appointmentId } = getControlValues(
        control
      );

      const userAppointmentsWithoutCurrent = appointments.filter(
        (app) => app.userId === userId && app.id !== appointmentId
      );

      return checkDate(userAppointmentsWithoutCurrent, startDate, endDate)
        ? { endDate: true }
        : null;
    }
    return null;
  };
}
