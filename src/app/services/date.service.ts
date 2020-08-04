import * as moment from 'moment';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Day } from '../models/day';
import { Injectable } from '@angular/core';
import { Calendar } from '../models/calendar';
import { Month } from '../models/month';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  monthsNames = moment.months();
  calendar: Calendar = {
    months: [],
    users: [
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
    ]
  };

  constructor() {
    this.calendar.months = this.monthsNames.map(
      (e, index): Month => ({
        name: e,
        daysNumber: this.days(index + 1).daysQuantity,
        days: this.days(index + 1).days
      })
    );
  }

  isWeekend = (day) => (day == 'Saturday' || day == 'Sunday' ? true : false);

  dateString = (index) => (index > 9 ? `${index}` : `0${index}`);

  formatDate = (date) => moment(date).clone().format('YYYY-MM-DD');

  getDay(monthIndex, index) {
    const date = `2020-${this.dateString(monthIndex)}-${this.dateString(
      index
    )}`;
    const isToday = moment().isSame(date, 'date');
    const weekDay = moment(date).format('dddd');
    return { date, isToday, weekDay };
  }
  getParentControl(control: AbstractControl, controlName) {
    return (<FormGroup>control.parent).get(controlName).value;
  }

  days(index: number): { days: Day[]; daysQuantity: number } {
    const monthString = `2020-${this.dateString(index)}`;
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
