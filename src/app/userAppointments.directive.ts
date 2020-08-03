import * as moment from 'moment';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { Appointment } from './models/appointment';
import { getParentControl, formatDate, checkDate } from './helpers/formControl';

export function userAppointmentsValidator(
  appointments: Appointment[]
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.parent) {
      const userId: string = getParentControl(control, 'userId'); //(<FormGroup>control.parent).get('userId').value;
      const startDate: string = formatDate(
        getParentControl(control, 'startDate')
      );
      const endDate = formatDate(control.value);

      return checkDate(appointments, startDate, endDate, userId)
        ? { endDate: true }
        : null;
    }
    return null;
  };
}
