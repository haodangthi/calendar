import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from '../sevices/calendar.service';
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
  appointments = [];
  months;
  users;

  constructor(
    private calendarSevice: CalendarService //private store: Store<{ calendar: Calendar }>
  ) {}

  ngOnInit(): void {
    this.calendarSevice.calendar$.subscribe((res) => {
      this.appointments = (res && res.appointments) || [];
      this.months = res && res.months;
      console.log(res);
      this.users = res && res.users;
    });

    const date = new Date();
    console.log(moment(date).format('MMMM'));
  }

  isAppointment(day) {
    return this.appointments.some((app) => {
      return app.startDate <= day.id && app.endDate >= day.id;
    });
  }

  appointmentExists(userId, day) {
    const userAppointments = this.appointments.filter(
      (app) => app.userId == userId
    );
    return userAppointments.some((app) => {
      return app.startDate <= day.id && app.endDate >= day.id;
    });
  }
}
