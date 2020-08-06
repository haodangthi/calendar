import * as moment from 'moment';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Appointment } from '../models/appointment';

export function validateDates(appointmnets, startDate, endDate) {
  return appointmnets.some(
    (app) =>
      (app.startDate <= startDate && app.endDate >= startDate) ||
      (app.startDate <= endDate && app.endDate >= endDate) ||
      (app.startDate >= startDate && app.endDate <= endDate)
  );
}

export function getControlValues(control) {
  return {
    userId: control.get('userId').value,
    startDate: formatDate(control.get('startDate').value),
    endDate: formatDate(control.get('endDate').value),
    appointmentId: control.get('id') && control.get('id').value
  };
}

export function checkDate(appointments, startDate, endDate) {
  return validateDates(appointments, startDate, endDate);
}

export function formatDate(date) {
  return moment(date).clone().format('YYYY-MM-DD');
}
