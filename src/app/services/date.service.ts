import * as moment from 'moment';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Day } from '../models/day';
import { Injectable } from '@angular/core';
import { Calendar } from '../models/calendar';
import { Month } from '../models/month';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  currentYear = '2020';
  monthsNames = moment.months();
  years: string[] = [];
  users: User[] = [
    {
      name: 'Dan',
      id: '0',
      color: 'green'
    },
    {
      name: 'Daniel',
      id: '1',
      color: 'yellow'
    },
    {
      name: 'Dima',
      id: '2',
      color: 'red'
    }
  ];
  calendar$: BehaviorSubject<Calendar> = new BehaviorSubject({
    months: [],
    users: []
  });

  constructor() {
    //debugger;
    this.setYear(this.currentYear);
    this.years = Array(40)
      .fill('')
      .map((e, index) =>
        index + 1 > 9 ? `20${index + 1}` : `200${index + 1}`
      );
    //debugger;
  }
  setYear(year) {
    this.currentYear = year;
    this.calendar$.next({
      ...this.calendar$.value,
      months: this.setMonths(this.currentYear)
    });
  }

  setMonths(year) {
    const prevYear = '' + (year - 1);
    const nextYear = '' + (+year + 1);
    const lastMonthName = moment.months()[11];
    const nextMonthName = moment.months()[0];
    const lastMonth = this.getMonth(prevYear, lastMonthName, 11);
    const nextMonth = this.getMonth(nextYear, nextMonthName, 0);
    const currentYearMonths = this.monthsNames.map(
      (e, index): Month => this.getMonth(year, e, index)
    );
    return [lastMonth, ...currentYearMonths, nextMonth];
  }

  getMonth(year, monthName, monthIndex) {
    return {
      monthName,
      year,
      daysNumber: this.days(year, monthIndex + 1).daysQuantity,
      days: this.days(year, monthIndex + 1).days
    };
  }

  isWeekend(day) {
    return day == 'Saturday' || day == 'Sunday' ? true : false;
  }

  dateString(index) {
    return index > 9 ? `${index}` : `0${index}`;
  }

  formatDate(date) {
    return moment(date).clone().format('YYYY-MM-DD');
  }

  getDay(year, monthIndex, dayIndex) {
    const date = `${year}-${this.dateString(monthIndex)}-${this.dateString(
      dayIndex
    )}`;
    const isToday = moment().isSame(date, 'date');
    const weekDay = moment(date).format('dddd');
    return { date, isToday, weekDay };
  }
  getParentControl(control: AbstractControl, controlName) {
    return (<FormGroup>control.parent).get(controlName).value;
  }

  days(
    year: string,
    monthIndex: number
  ): { days: Day[]; daysQuantity: number } {
    const monthString = `${year}-${this.dateString(monthIndex)}`;

    const daysQuantity = moment(monthString).clone().daysInMonth();

    const days = Array(daysQuantity)
      .fill(1)
      .map(
        (day, i): Day => {
          const date = this.getDay(year, monthIndex, i + 1);
          return {
            id: date.date,
            value: i + 1,
            weekDay: date.weekDay,
            isWeekend: this.isWeekend(date.weekDay),
            isToday: date.isToday,
            isSelected: false
          };
        }
      );

    return { days, daysQuantity };
  }
}
