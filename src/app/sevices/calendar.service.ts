import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendar } from '../models/calendar';
import { Store, select } from '@ngrx/store';
import { addAppointment } from '../calendar.actions';
import { Appointment } from '../models/appointment';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendar$: Observable<Calendar>;
  constructor(private store: Store<{ calendar: Calendar }>) {
    this.calendar$ = store.pipe(select('calendar'));
  }

  chooseDays(startDate: string, endDate: string, userId: string) {
    const newAppointment: Appointment = {
      startDate,
      endDate,
      id: startDate + endDate,
      userId
    };
    this.store.dispatch(addAppointment({ newAppointment }));
  }
}
