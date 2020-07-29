import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from '../sevices/calendar.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Calendar } from '../models/calendar';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendar = {};
  title = 'calendar';
  current;
  days = Array(31);
  appointments;
  months;
  //count$: Observable<Calendar>;

  constructor(
    private calendarSevice: CalendarService //private store: Store<{ calendar: Calendar }>
  ) {
    //this.count$ = store.pipe(select('calendar'));
    //console.log(this.count$);
  }

  ngOnInit(): void {
    this.calendarSevice.calendar$.subscribe((res) => {
      this.appointments = res.appointments;
      this.months = res.months;
      console.log(this.months);
      console.log(this.isAppointment(this.months[6].days[29]));
    });

    const date = new Date();
    console.log(moment(date).format('MMMM'));
  }

  isAppointment(day) {
    return this.appointments.some((app) => {
      return app.startDate <= day.id && app.endDate >= day.id;
    });
  }
}
