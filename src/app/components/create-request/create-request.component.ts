import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

import { Observable } from 'rxjs';
import { CalendarService } from '../../services/calendar.service';
import { DateService } from '../../services/date.service';

import { User } from 'src/app/models/user';
import { Appointment } from '../../models/appointment';
import { requestFormValidator } from '../../validators/request-form-validator';
@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {
  createRequestForm: FormGroup;
  minDate = moment().toDate();
  startDate;
  appointments: Appointment[] = [];
  users: User[] = [];
  calendar$: Observable<Appointment[]>;
  constructor(
    public dialogRef: MatDialogRef<CreateRequestComponent>,
    private calendarService: CalendarService,
    private dateService: DateService
  ) {
    this.calendar$ = this.calendarService.entities$;
    this.users = this.dateService.calendar.users;
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
    newRequest.startDate = this.dateService.formatDate(newRequest.startDate);
    newRequest.endDate = this.dateService.formatDate(newRequest.endDate);

    this.calendarService.add({
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      userId: newRequest.userId
    });
    this.dialogRef.close();
  }
}
