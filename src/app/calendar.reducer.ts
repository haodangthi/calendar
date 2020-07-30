import { createReducer, on, Action } from '@ngrx/store';
import { reset, addAppointment } from './calendar.actions';
import { Calendar } from './models/calendar';

import calendar from './calendarState';
export const initialState = calendar;

const _calendarReducer = createReducer(
  initialState,
  on(reset, (state) => state),
  on(addAppointment, (state, { newAppointment }) => {
    return {
      ...state,
      appointments: [...state.appointments, newAppointment]
    };
  })
);

export function calendarReducer(state: Calendar, action: Action) {
  return _calendarReducer(state, action);
}
