import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

const obj = {
  id: '2020-11-01',
  isSelected: false,
  isToday: false,
  isWeekend: true,
  value: 1,
  weekDay: 'Sunday'
};

const day = {
  date: '2020-10-01',
  isToday: false,
  weekDay: 'Thursday'
};
const firstDay = {
  id: '2020-01-01',
  isSelected: false,
  isToday: false,
  isWeekend: false,
  value: 1,
  weekDay: 'Wednesday'
};

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format the date', () => {
    const date =
      'Wed Aug 05 2020 14:40:34 GMT+0300 (Eastern European Summer Time)';
    expect(service.formatDate(date)).toEqual('2020-08-05');
  });

  it('Saturday and Sunday should return true', () => {
    expect(service.isWeekend('Saturday')).toEqual(true);
    expect(service.isWeekend('Sunday')).toEqual(true);
  });

  it('getMonth method should return a month object', () => {
    expect(service.getMonth('2020', 'September', 10).days[0]).toEqual(obj);
  });

  it('getDay method should return a day object', () => {
    expect(service.getDay('2020', 10, 1)).toEqual(day);
  });

  it('days method should return all days of the month ', () => {
    expect(service.days('2020', 1).days.length).toEqual(31);
    expect(service.days('2020', 1).days[0]).toEqual(firstDay);
  });

  it("setMonth method should return 12 months, previous and next year's month", () => {
    const months = service.setMonths('2020');
    expect(months.length).toEqual(14);
    expect(service.setMonths('2020')[0].days[0].id).toEqual('2019-12-01');
  });
});
