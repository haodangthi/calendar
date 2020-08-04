import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Appointment } from '../../models/appointment';

import { DateService } from '../../services/date.service';
import { CalendarService } from '../../services/calendar.service';
import { Observable } from 'rxjs';
import { changeRequestFormValidator } from 'src/app/validators/change-request-validator';

@Component({
  selector: 'app-change-request',
  templateUrl: './change-request.component.html',
  styleUrls: ['./change-request.component.scss']
})
export class ChangeRequestComponent implements OnInit {
  changeRequestForm: FormGroup;
  appointmnent: Appointment;
  appointments: Appointment[] = [];
  users: User[] = [];
  appointments$: Observable<Appointment[]>;
  constructor(
    public dialogRef: MatDialogRef<ChangeRequestComponent>,
    private dateService: DateService,
    private calendarService: CalendarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.appointments$ = this.calendarService.entities$;
    this.appointmnent = data;
    this.users = this.dateService.users;
  }

  ngOnInit(): void {
    console.log(this.data);
    this.appointments$.subscribe((res) => {
      this.appointments = res;
      if (!this.changeRequestForm) {
        //debugger;
        this.changeRequestForm = new FormGroup(
          {
            id: new FormControl(this.appointmnent.id),
            startDate: new FormControl(this.appointmnent.startDate, [
              Validators.required
            ]),
            endDate: new FormControl(this.appointmnent.endDate, [
              Validators.required
            ]),
            type: new FormControl(null),
            userId: new FormControl(this.appointmnent.userId)
          },
          { validators: [changeRequestFormValidator(this.appointments)] }
        );
      }
    });
  }

  saveChanges() {
    let updatedRequest: Appointment = this.changeRequestForm.value;
    updatedRequest = {
      ...updatedRequest,
      startDate: this.dateService.formatDate(updatedRequest.startDate),
      endDate: this.dateService.formatDate(updatedRequest.endDate)
    };

    this.calendarService.update(updatedRequest);
    this.dialogRef.close();
    //debugger;
  }

  delete() {
    const updatedRequest: Appointment = this.changeRequestForm.value;
    this.calendarService.delete(updatedRequest);
    this.dialogRef.close();
  }
}
