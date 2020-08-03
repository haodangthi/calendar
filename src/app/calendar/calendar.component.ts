import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from '../sevices/calendar.service';
import { Appointment } from '../models/appointment';
import { Observable } from 'rxjs';
import calendar from '../calendarState';
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
  months = calendar.months;
  users = calendar.users;
  calendar$: Observable<Appointment[]>;

  constructor(private calendarService: CalendarService) {
    this.calendar$ = this.calendarService.entities$;
  }

  ngOnInit(): void {
    this.calendarService.getAll().subscribe((res) => {
      this.appointments = res;
    });

    this.calendar$.subscribe((res) => {
      this.appointments = res;
    });
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
