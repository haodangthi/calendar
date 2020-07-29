import { createAction, props } from '@ngrx/store';
import { Request } from './models/request';
export const addAppointment = createAction(
  '[Calendar Component] AddAppointment',
  props<{ newAppointment: Request }>()
);
export const reset = createAction('[Counter Component] Reset');
