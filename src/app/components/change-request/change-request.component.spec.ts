import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRequestComponent } from './change-request.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from 'src/app/entity-metadata';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const matDialogRefStub = {};

describe('ChangeRequestComponent', () => {
  let component: ChangeRequestComponent;
  let fixture: ComponentFixture<ChangeRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
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
      declarations: [ChangeRequestComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRequestComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('change Request form should work ', () => {
    component.changeRequestForm.controls['startDate'].setValue(
      'Tue Aug 18 2020 00:00:00 GMT+0300 (Eastern European Summer Time)'
    );
    component.changeRequestForm.controls['endDate'].setValue(
      'Thu Aug 20 2020 00:00:00 GMT+0300 (Eastern European Summer Time)'
    );
    component.changeRequestForm.controls['userId'].setValue('2');
    expect(component.getUpdatedRequest()).toEqual({
      endDate: '2020-08-20',
      id: null,
      startDate: '2020-08-18',
      type: null,
      userId: '2'
    });
  });
});
