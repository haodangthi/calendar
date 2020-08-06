import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestComponent } from './create-request.component';
import { StoreModule } from '@ngrx/store';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from 'src/app/entity-metadata';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const matDialogRefStub = {};
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
describe('CreateRequestComponent', () => {
  let component: CreateRequestComponent;
  let fixture: ComponentFixture<CreateRequestComponent>;
  const startDate =
    'Tue Aug 18 2020 00:00:00 GMT+0300 (Eastern European Summer Time)';
  const endDate =
    'Thu Aug 20 2020 00:00:00 GMT+0300 (Eastern European Summer Time)';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        StoreModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        HttpClientModule,
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot(entityConfig)
      ],
      declarations: [CreateRequestComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequestComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('change Request form should work ', () => {
    component.createRequestForm.controls['startDate'].setValue(startDate);
    component.createRequestForm.controls['endDate'].setValue(endDate);
    component.createRequestForm.controls['userId'].setValue('2');

    expect(component.createRequestForm.value).toEqual({
      endDate: endDate,
      id: '1',
      startDate: startDate,
      type: null,
      userId: '2'
    });
  });

  it('form should NOT  be valid', () => {
    component.appointments = fakeAppointments;
    component.createRequestForm.controls['startDate'].setValue(
      'Tue Aug 18 2020 00:00:00 GMT+0300 (Eastern European Summer Time)'
    );
    component.createRequestForm.controls['endDate'].setValue(
      'Thu Aug 20 2020 00:00:00 GMT+0300 (Eastern European Summer Time)'
    );
    component.createRequestForm.controls['userId'].setValue('2');
    expect(component.createRequestForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.appointments = fakeAppointments;
    component.createRequestForm.controls['startDate'].setValue(
      'Tue Aug 04 2020 00:00:00 GMT+0300 (Eastern European Summer Time)'
    );
    component.createRequestForm.controls['endDate'].setValue(
      'Thu Aug 08 2020 00:00:00 GMT+0300 (Eastern European Summer Time)'
    );
    component.createRequestForm.controls['userId'].setValue('2');
    expect(component.createRequestForm.valid).toEqual(true);
  });
});
