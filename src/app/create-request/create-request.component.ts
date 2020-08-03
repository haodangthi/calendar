import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Appointment } from '../models/appointment';
import { formatDate, checkDate } from '../helpers/formControl';
import { requestFormValidator } from '../requestFormValidator';
import calendar from '../calendarState';
import { Observable } from 'rxjs';
import { CalendarService } from '../sevices/calendar.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {
  createRequestForm: FormGroup;
  minDate = moment().toDate();
  startDate;
  appointments = [];
  users = calendar.users;
  calendar$: Observable<Appointment[]>;
  constructor(
    public dialogRef: MatDialogRef<CreateRequestComponent>,
    private calendarService: CalendarService
  ) {
    this.calendar$ = this.calendarService.entities$;
  }

  ngOnInit(): void {
    this.calendar$.subscribe((res) => {
      this.appointments = res;
      if (!this.createRequestForm) {
        //debugger;
        this.createRequestForm = new FormGroup(
          {
            id: new FormControl('1'),
            startDate: new FormControl(null, [Validators.required]),
            endDate: new FormControl(null, [Validators.required]),
            type: new FormControl(null),
            userId: new FormControl(null)
          },
          { validators: [requestFormValidator(this.appointments)] }
        );
      }
    });
  }

  createRequest() {
    const newRequest: Appointment = this.createRequestForm.value;
    newRequest.startDate = formatDate(newRequest.startDate);
    newRequest.endDate = formatDate(newRequest.endDate);

    this.calendarService.add({
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      userId: newRequest.userId
    });
    this.dialogRef.close();
  }
}
