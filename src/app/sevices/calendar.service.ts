import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendar } from '../models/calendar';
import { Store, select } from '@ngrx/store';
import { addAppointment } from '../calendar.actions';
import { Request } from '../models/request';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendar$: Observable<Calendar>;
  constructor(private store: Store<{ calendar: Calendar }>) {
    this.calendar$ = store.pipe(select('calendar'));
  }

  chooseDays(startDate: string, endDate: string) {
    const newAppointment: Request = {
      startDate,
      endDate,
      id: startDate + endDate
    };
    this.store.dispatch(addAppointment({ newAppointment }));
  }
}
