import * as moment from 'moment';
import { AbstractControl, FormGroup } from '@angular/forms';

export function checkDate(appointments, startDate, endDate, userId) {
  const userAppointments = appointments.filter((app) => app.userId === userId);

  return userAppointments.some(
    (app) =>
      (app.startDate <= startDate && app.endDate >= startDate) ||
      (app.startDate <= endDate && app.endDate >= endDate) ||
      (app.startDate >= startDate && app.endDate <= endDate)
  );
}

export function getParentControl(control: AbstractControl, controlName) {
  return (<FormGroup>control.parent).get(controlName).value;
}

export function formatDate(date) {
  return moment(date).clone().format('YYYY-MM-DD');
}
