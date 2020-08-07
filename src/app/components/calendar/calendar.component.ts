import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { DateService } from '../../services/date.service';

import { Appointment } from '../../models/appointment';
import { Observable } from 'rxjs';
import { Month } from 'src/app/models/month';
import { User } from 'src/app/models/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangeRequestComponent } from '../change-request/change-request.component';
import * as moment from 'moment';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  title = 'calendar';
  currentYear;
  days = Array(31);
  years;
  appointments: Appointment[] = [];
  months: Month[] = [];
  users: User[] = [];
  appointments$: Observable<Appointment[]>;

  constructor(
    private calendarService: CalendarService,
    private dateService: DateService,
    public dialog: MatDialog
  ) {
    this.appointments$ = this.calendarService.entities$;
    this.users = this.dateService.users;
  }

  ngOnInit(): void {
    this.currentYear = this.dateService.currentYear;
    this.calendarService.getAll().subscribe((res) => {
      //debugger;
      this.appointments = res;
    });

    this.appointments$.subscribe((res) => {
      this.appointments = res;
      console.log(this.appointments);
    });

    this.years = this.dateService.years;
    this.dateService.calendar$.subscribe((res) => {
      this.months = res.months;
    });
  }
  setCurrentYear() {
    this.dateService.setYear(this.currentYear);
  }

  // isAppointment(day) {
  //   return this.appointments.some((app) => {
  //     return app.startDate <= day.id && app.endDate >= day.id;
  //   });
  // }

  isCurrentMonth(month) {
    return month.year === this.currentYear;
  }
  // getUsersAppointments(userId) {
  //   return this.appointments.filter((app) => app.userId == userId);
  // }

  // appointmentExists(userId, day) {
  //   const userAppointments = this.getUsersAppointments(userId);
  //   return userAppointments.some((app) => {
  //     return app.startDate <= day.id && app.endDate >= day.id;
  //   });
  // }

  getMonthAppointments({ startDate, endDate }: Appointment) {
    const startMonthIndex = this.getDateIndex(startDate, 'M');
    const endMonthIndex = this.getDateIndex(endDate, 'M');
    const startDayIndex = this.getDateIndex(startDate, 'D');
    const endDayIndex = this.getDateIndex(endDate, 'D');
    const yearIndex = this.getDateIndex(endDate, 'YYYY');
    //debugger;
    return {
      startMonthIndex,
      endMonthIndex,
      startDayIndex,
      endDayIndex,
      yearIndex
    };
  }

  isWithinOneMonth(appointment: Appointment) {
    const { startMonthIndex, endMonthIndex } = this.getMonthAppointments(
      appointment
    );
    return startMonthIndex === endMonthIndex;
  }

  isUsersAppointment(appointment: Appointment, user: User) {
    return appointment.userId === user.id;
  }

  isCurrentYear(appointment: Appointment) {
    const { yearIndex } = this.getMonthAppointments(appointment);
    return this.currentYear === yearIndex;
  }

  checkAppointment(appointment: Appointment, user: User) {
    return (
      this.isUsersAppointment(appointment, user) &&
      this.isCurrentYear(appointment)
    );
  }

  getCalculatedStyleForMonth(appointment: Appointment, userIndex, user: User) {
    const {
      startMonthIndex,
      startDayIndex,
      endDayIndex
    } = this.getMonthAppointments(appointment);
    const dayWidth = `100px + (100% - 100px) / 31`;
    return {
      top: `${+startMonthIndex * 70 + 15 * (userIndex + 1)}px`,
      left: `calc((${dayWidth} * ${
        +startDayIndex - 1
      }) + (${dayWidth} - 100px) / 2)`,
      width: `calc((100% - 100px) / 31 * ${+endDayIndex - +startDayIndex})`,
      'border-radius': '5px',
      'background-color': user.color
    };
  }

  getCalculatedStyle(
    appointment: Appointment,
    position,
    userIndex,
    user: User
  ) {
    const {
      startMonthIndex,
      startDayIndex,
      endDayIndex
    } = this.getMonthAppointments(appointment);
    const dayWidth = `(100% - 100px) / 31`;
    const bgColor = { 'background-color': user.color };

    switch (position) {
      case 'START':
        return {
          top: `${+startMonthIndex * 70 + 15 * (userIndex + 1)}px`,
          left: `calc((100px + ${dayWidth} * ${
            +startDayIndex - 1
          }) + ${dayWidth} / 2)`,
          width: `calc(${dayWidth} * ${
            +31 - +startDayIndex
          } + ${dayWidth} / 2)`,
          'border-radius': '5px 0 0 5px ',
          ...bgColor
        };

      case 'END':
        return {
          top: `${(+startMonthIndex + 1) * 70 + 15 * (userIndex + 1)}px`,
          left: `100px`,
          width: `calc(${dayWidth} * ${endDayIndex} - ${dayWidth} / 2)`,
          'border-radius': '0 5px 5px 0',
          ...bgColor
        };
    }
  }

  getDateIndex(date: string, format: string) {
    return moment(moment(date).format()).format(format);
  }

  // getAppointment(userId, day) {
  //   const userAppointments = this.getUsersAppointments(userId);
  //   const appointment = userAppointments.filter(
  //     (app) => app.startDate <= day.id && app.endDate >= day.id
  //   )[0];
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.data = appointment;
  //   this.dialog.open(ChangeRequestComponent, dialogConfig);
  //   console.log(appointment);
  // }

  changeAppointment(appointment: Appointment) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = appointment;
    this.dialog.open(ChangeRequestComponent, dialogConfig);
  }
  ngOnDestroy() {
    this.dateService.calendar$.unsubscribe();
  }
}
