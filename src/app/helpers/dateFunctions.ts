import * as moment from 'moment';
import { Day } from '../models/day';

function dateString(index) {
  return index > 9 ? `${index}` : `0${index}`;
}

function getDay(monthIndex, index) {
  const date = `2020-${dateString(monthIndex)}-${dateString(index)}`;
  const isToday = moment().isSame(date, 'date');
  const weekDay = moment(date).format('dddd');
  return { date, isToday, weekDay };
}

function isWeekend(day) {
  return day == 'Saturday' || day == 'Sunday' ? true : false;
}
function days(index: number): { days: Day[]; daysQuantity: number } {
  const monthString = `2020-${dateString(index)}`;
  const daysQuantity = moment(monthString).clone().daysInMonth();
  const days = Array(daysQuantity)
    .fill(1)
    .map(
      (day, i): Day => {
        const date = getDay(index, i + 1);
        return {
          id: date.date,
          value: i + 1,
          weekDay: date.weekDay,
          isWeekend: isWeekend(date.weekDay),
          isToday: date.isToday,
          isSelected: false
        };
      }
    );

  return { days, daysQuantity };
}

export default days;
