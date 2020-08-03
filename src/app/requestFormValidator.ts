import * as moment from 'moment';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { Appointment } from './models/appointment';
import { formatDate, checkDate } from './helpers/formControl';

export function requestFormValidator(appointments: Appointment[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control) {
      const userId: string = control.get('userId').value; //(<FormGroup>control.parent).get('userId').value;
      const startDate: string = formatDate(control.get('startDate').value);
      const endDate: string = formatDate(control.get('endDate').value);
      //debugger;
      return checkDate(appointments, startDate, endDate, userId)
        ? { endDate: true }
        : null;
    }
    return null;
  };
}
