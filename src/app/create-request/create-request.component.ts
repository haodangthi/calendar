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
import { CalendarService } from '../sevices/calendar.service';
import { Appointment } from '../models/appointment';
import { formatDate, checkDate } from '../helpers/formControl';
import { requestFormValidator } from '../requestFormValidator';

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

  constructor(
    public dialogRef: MatDialogRef<CreateRequestComponent>,
    private calendarService: CalendarService,
    private fb: FormBuilder
  ) {}

  users;

  ngOnInit(): void {
    this.calendarService.calendar$.subscribe((res) => {
      //debugger;
      this.appointments = (res && res.appointments) || [];
      this.users = res.users;

      if (!this.createRequestForm) {
        this.createRequestForm = new FormGroup(
          {
            id: new FormControl('1'),
            startDate: new FormControl(null, [Validators.required]),
            endDate: new FormControl(null, [Validators.required]),
            type: new FormControl(null),
            userId: new FormControl(null, [Validators.required])
          },
          { validators: [requestFormValidator(this.appointments)] }
        );
      }
    });
  }

  createRequest() {
    debugger;
    const newRequest: Appointment = this.createRequestForm.value;
    newRequest.startDate = formatDate(newRequest.startDate);
    newRequest.endDate = formatDate(newRequest.endDate);

    if (
      checkDate(
        this.appointments,
        newRequest.startDate,
        newRequest.endDate,
        newRequest.userId
      )
    ) {
      throw new Error();
    } else {
      this.calendarService.chooseDays(
        newRequest.startDate,
        newRequest.endDate,
        newRequest.userId
      );
      this.dialogRef.close();
    }
  }
}
