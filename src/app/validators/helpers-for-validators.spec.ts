import {
  formatDate,
  validateDates,
  checkDate,
  getControlValues
} from './helpers-for-validators';
import { FormGroup, FormControl } from '@angular/forms';
const fakeAppointments = [
  {
    endDate: '2020-08-21',
    id: '2020-08-212020-08-11',
    startDate: '2020-08-11',
    userId: '1'
  },
  {
    endDate: '2020-08-28',
    id: '2020-08-282020-08-22',
    startDate: '2020-08-22',
    userId: '1'
  },
  {
    endDate: '2020-08-23',
    id: '2020-08-232020-08-11',
    startDate: '2020-08-11',
    userId: '2'
  }
];

const startDate =
  'Tue Aug 04 2020 00:00:00 GMT+0300 (Eastern European Summer Time)';
const endDate =
  'Thu Aug 10 2020 00:00:00 GMT+0300 (Eastern European Summer Time)';

const startDate1 =
  'Tue Aug 21 2020 00:00:00 GMT+0300 (Eastern European Summer Time)';
const endDate1 =
  'Thu Aug 27 2020 00:00:00 GMT+0300 (Eastern European Summer Time)';

describe('HELPERS FOR FORM VALIDATORS', () => {
  const form = new FormGroup({
    id: new FormControl('1'),
    startDate: new FormControl(null),
    endDate: new FormControl(null),
    type: new FormControl(null),
    userId: new FormControl('1')
  });
  it('formatDate should return formatted date string', () => {
    expect(formatDate(startDate)).toEqual('2020-08-04');
  });

  it('validateDates should return boolean', () => {
    expect(
      validateDates(
        fakeAppointments,
        formatDate(startDate),
        formatDate(endDate)
      )
    ).toEqual(false);
    expect(
      validateDates(
        fakeAppointments,
        formatDate(startDate1),
        formatDate(endDate1)
      )
    ).toEqual(true);
  });

  it('checkDate should return boolean', () => {
    expect(checkDate(fakeAppointments, startDate, endDate)).toEqual(
      validateDates(fakeAppointments, startDate, endDate)
    );
    expect(checkDate(fakeAppointments, startDate1, endDate1)).toEqual(
      validateDates(fakeAppointments, startDate1, endDate1)
    );
  });

  it('change request form should be valid and return null', () => {
    form.controls['startDate'].setValue(startDate1);
    form.controls['endDate'].setValue(endDate1);
    form.controls['userId'].setValue('1');
    expect(getControlValues(form)).toEqual({
      endDate: '2020-08-27',
      appointmentId: '1',
      startDate: '2020-08-21',
      userId: '1'
    });
  });
});
