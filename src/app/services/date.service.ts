import * as moment from 'moment';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Day } from '../models/day';
import { Injectable } from '@angular/core';
import { Calendar } from '../models/calendar';
import { Month } from '../models/month';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';

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
      months: this.setMonth(this.currentYear)
    });
  }

  setMonth(year) {
    return this.monthsNames.map(
      (e, index): Month => ({
        name: e,
        daysNumber: this.days(year, index + 1).daysQuantity,
        days: this.days(year, index + 1).days
      })
    );
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

  getDay(monthIndex, index) {
    const date = `${this.currentYear}-${this.dateString(
      monthIndex
    )}-${this.dateString(index)}`;
    const isToday = moment().isSame(date, 'date');
    const weekDay = moment(date).format('dddd');
    return { date, isToday, weekDay };
  }
  getParentControl(control: AbstractControl, controlName) {
    return (<FormGroup>control.parent).get(controlName).value;
  }

  days(year: string, index: number): { days: Day[]; daysQuantity: number } {
    const monthString = `${year}-${this.dateString(index)}`;

    const daysQuantity = moment(monthString).clone().daysInMonth();

    const days = Array(daysQuantity)
      .fill(1)
      .map(
        (day, i): Day => {
          const date = this.getDay(index, i + 1);
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
