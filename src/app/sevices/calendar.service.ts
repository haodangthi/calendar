import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Month } from '../models/month';
import { Calendar } from '../models/calendar';
import * as moment from 'moment';
import days from '../helpers/dateFunctions';
import { Store, select } from '@ngrx/store';
import { addAppointment } from '../calendar.actions';
import { Request } from '../models/request';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendar: Calendar = {
    months: [],
    appointments: [
      {
        endDate: '2020-07-31',
        id: '2020-07-292020-07-31',
        startDate: '2020-07-29'
      }
    ]
  };
  months$: BehaviorSubject<Month[]> = new BehaviorSubject(null);
  monthsNames = moment.months();
  months;

  calendar$: BehaviorSubject<Calendar> = new BehaviorSubject(this.calendar);
  count$: Observable<Calendar>;
  constructor(private store: Store<{ calendar: Calendar }>) {
    console.log(this.monthsNames);
    this.count$ = store.pipe(select('calendar'));

    //console.log('NGRX STORE', this.count$);

    this.months = this.monthsNames.map((e, index) => ({
      name: e,
      daysNumber: days(index + 1).daysQuantity,
      days: days(index + 1).days
    }));
    this.months$.next(this.months);
    this.count$ = store.pipe(select('calendar'));
    this.calendar$.next({
      ...this.calendar$.value,
      months: this.months$.value
    });
  }

  chooseDays(startDate: string, endDate: string) {
    const startMonth = moment(startDate).format('MMMM');
    const endMonth = moment(endDate).format('MMMM');
    const newAppointment: Request = {
      startDate,
      endDate,
      id: startDate + endDate
    };
    this.store.dispatch(addAppointment({ newAppointment }));

    // this.calendar$.next({
    //   ...this.calendar$.value,
    //   appointments: [...this.calendar$.value.appointments, newAppointment]
    // });
    console.log(this.calendar$.value);

    // if (startMonth == endMonth) {
    //   const selectedDays = selectMonths(
    //     this.months$.value,
    //     startDate,
    //     endDate,
    //     startMonth
    //   );
    //   //console.log(selectedDays);
    //   this.calendar$.next({
    //     months: selectedDays,
    //     appointments: []
    //   });
    // } else {
    //   const lastDay = getLastDayOfMonth(this.months$.value, startMonth).id;
    //   const firstDay = getFirstDayOfMonth(this.months$.value, endMonth).id;
    //   let selectedDays = selectMonths(
    //     this.months$.value,
    //     startDate,
    //     lastDay,
    //     startMonth
    //   );
    //   selectedDays = selectMonths(selectedDays, firstDay, endDate, endMonth);
    //   this.months$.next(selectedDays);
    //   this.calendar$.next({
    //     months: selectedDays,
    //     appointments: []
    //   });
    // }
  }
}

function selectMonths(months, startDate, endDate, monthName) {
  return months.map((month) =>
    selectDays(month, startDate, endDate, monthName)
  );
}

function selectDays(month, startDate, endDate, monthName) {
  if (month.name == monthName) {
    return {
      ...month,
      days: month.days.map((day) => compareDates(day, startDate, endDate))
    };
  }
  return month;
}

function compareDates(day, startDate, endDate) {
  if (day.id >= startDate && day.id <= endDate) {
    return { ...day, isSelected: true };
  }
  return day;
}

function getLastDayOfMonth(months, monthName) {
  const month = months.filter((month) => month.name === monthName)[0];
  console.log(month.days[month.days.length - 1]);

  return month.days[month.days.length - 1];
}

function getFirstDayOfMonth(months, monthName) {
  return months.filter((month) => month.name === monthName)[0].days[0];
}
