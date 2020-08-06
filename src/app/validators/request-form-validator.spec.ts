import { FormGroup, FormControl, Validators } from '@angular/forms';
import { requestFormValidator } from './request-form-validator';
const fakeAppointments = [
  {
    endDate: '2020-08-21',
    id: '2020-08-212020-08-11',
    startDate: '2020-08-11',
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
  'Tue Aug 12 2020 00:00:00 GMT+0300 (Eastern European Summer Time)';
const endDate1 =
  'Thu Aug 20 2020 00:00:00 GMT+0300 (Eastern European Summer Time)';

describe('REQUEST FORM VALIDATOR', () => {
  const form = new FormGroup(
    {
      id: new FormControl('1'),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      type: new FormControl(null),
      userId: new FormControl(null, [Validators.required])
    },
    { validators: [requestFormValidator(fakeAppointments)] }
  );

  it('request form validator should not be valid if control is empty and return null', () => {
    expect(form.valid).toEqual(false);
  });

  it('request form should be valid and return null', () => {
    form.controls['startDate'].setValue(startDate);
    form.controls['endDate'].setValue(endDate);
    form.controls['userId'].setValue('2');
    expect(form.valid).toEqual(true);
    expect(requestFormValidator(fakeAppointments)(form)).toEqual(null);
  });

  it('request form validator should work correctly', () => {
    form.controls['startDate'].setValue(startDate1);
    form.controls['endDate'].setValue(endDate1);
    form.controls['userId'].setValue('2');
    expect(form.valid).toEqual(false);
    expect(requestFormValidator(fakeAppointments)(form)).toEqual({
      endDate: true
    });
  });
});
