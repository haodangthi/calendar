import { createAction, props } from '@ngrx/store';

import { Appointment } from './models/appointment';
export const addAppointment = createAction(
  '[Calendar Component] AddAppointment',
  props<{ newAppointment: Appointment }>()
);
export const reset = createAction('[Counter Component] Reset');
