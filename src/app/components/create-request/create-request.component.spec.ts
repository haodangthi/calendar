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
const matDialogRefStub = {};
describe('CreateRequestComponent', () => {
  let component: CreateRequestComponent;
  let fixture: ComponentFixture<CreateRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        StoreModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule
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
    component.createRequestForm = new FormGroup({
      id: new FormControl('1'),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      type: new FormControl(null),
      userId: new FormControl(null)
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
