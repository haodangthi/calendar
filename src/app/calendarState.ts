import * as moment from 'moment';
import days from './helpers/dateFunctions';
import { Calendar } from './models/calendar';
import { Month } from './models/month';

const monthsNames = moment.months();
const months: Month[] = monthsNames.map(
  (e, index): Month => ({
    name: e,
    daysNumber: days(index + 1).daysQuantity,
    days: days(index + 1).days
  })
);
const calendar: Calendar = {
  months: months,
  appointments: [
    {
      endDate: '2020-08-21',
      id: '2020-08-212020-08-11',
      startDate: '2020-08-11',
      userId: '1'
    }
  ],
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

export default calendar;
