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
      endDate: '2020-07-31',
      id: '2020-07-292020-07-31',
      startDate: '2020-07-29'
    }
  ]
};

export default calendar;
