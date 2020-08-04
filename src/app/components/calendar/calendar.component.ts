import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { DateService } from '../../services/date.service';

import { Appointment } from '../../models/appointment';
import { Observable } from 'rxjs';
import { Month } from 'src/app/models/month';
import { User } from 'src/app/models/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangeRequestComponent } from '../change-request/change-request.component';
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
  appointments: Appointment[] = [];
  months: Month[] = [];
  users: User[] = [];
  calendar$: Observable<Appointment[]>;

  constructor(
    private calendarService: CalendarService,
    private dateService: DateService,
    public dialog: MatDialog
  ) {
    this.calendar$ = this.calendarService.entities$;
    this.months = this.dateService.calendar.months;
    this.users = this.dateService.calendar.users;
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
  getUsersAppointments(userId) {
    return this.appointments.filter((app) => app.userId == userId);
  }

  appointmentExists(userId, day) {
    const userAppointments = this.getUsersAppointments(userId);
    return userAppointments.some((app) => {
      return app.startDate <= day.id && app.endDate >= day.id;
    });
  }

  getAppointment(userId, day) {
    const userAppointments = this.getUsersAppointments(userId);
    const appointment = userAppointments.filter(
      (app) => app.startDate <= day.id && app.endDate >= day.id
    )[0];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = appointment;
    this.dialog.open(ChangeRequestComponent, dialogConfig);
    console.log(appointment);
  }
  lineClick(event) {
    console.log(event.target);
  }
}
