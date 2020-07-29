import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dateValidator } from '../date-validator.directive';
import * as moment from 'moment';
import { Request } from '../models/request';
import { CalendarService } from '../sevices/calendar.service';
@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {
  createRequestForm: FormGroup;
  minDate = moment().toDate();
  stardDate;
  constructor(
    public dialogRef: MatDialogRef<CreateRequestComponent>,
    private calendarService: CalendarService
  ) {}
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  ngOnInit(): void {
    this.createRequestForm = new FormGroup({
      id: new FormControl('1'),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [dateValidator]),
      type: new FormControl(null)
    });
  }

  createRequest() {
    const newRequest: Request = this.createRequestForm.value;

    const startDate = moment(newRequest.startDate);
    const endDate = moment(newRequest.endDate);
    // console.log(moment
    //   .max(startDate, endDate)
    //   .format('MM-DD-YYYY') == endDate.format('MM-DD-YYYY'));

    newRequest.startDate = formatDate(newRequest.startDate);
    newRequest.endDate = formatDate(newRequest.endDate);
    this.calendarService.chooseDays(newRequest.startDate, newRequest.endDate);
  }
}

function formatDate(date) {
  return moment(date).clone().format('YYYY-MM-DD');
}
