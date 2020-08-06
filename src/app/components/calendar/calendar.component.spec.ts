import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CalendarComponent } from './calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from 'src/app/entity-metadata';
import { MatDialogModule } from '@angular/material/dialog';
import { DateService } from 'src/app/services/date.service';
import { CalendarService } from '../../services/calendar.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
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

const randomDay = {
  id: '2020-11-01',
  isSelected: false,
  isToday: false,
  isWeekend: true,
  value: 1,
  weekDay: 'Sunday'
};

const appointmentDay = {
  id: '2020-08-20',
  isSelected: false,
  isToday: false,
  isWeekend: false,
  value: 20,
  weekDay: 'Thursday'
};
describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let httpMock: HttpTestingController;
  let calendarService: CalendarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,

        StoreModule.forRoot({}),
        MatDialogModule,
        HttpClientModule,
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot(entityConfig)
      ],
      declarations: [CalendarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    //const userService = fixture.debugElement.injector.get(DateService);

    fixture.detectChanges();
  });

  afterEach(() => {
    //httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the DATE service', () => {
    const dateService = fixture.debugElement.injector.get(DateService);
    expect(dateService.currentYear).toEqual(component.currentYear);
  });
  it('isAppointment should return boolean', () => {
    component.appointments = fakeAppointments;
    expect(component.isAppointment(randomDay)).toEqual(false);
    expect(component.isAppointment(fakeAppointments[0])).toEqual(true);
  });

  it('isCurrentYear methos should return false for December 2019', () => {
    expect(component.isCurrentYear(component.months[0])).toEqual(false);
    expect(component.isCurrentYear(component.months[1])).toEqual(true);
  });
  it("getUsersAppointments should return user's appointmnets", () => {
    component.appointments = fakeAppointments;
    expect(component.getUsersAppointments('2')).toEqual([fakeAppointments[1]]);
  });

  it('appointmentExists should return boolean', () => {
    component.appointments = fakeAppointments;
    expect(component.appointmentExists('2', randomDay)).toEqual(false);
    expect(component.appointmentExists('2', appointmentDay)).toEqual(true);
  });
});
