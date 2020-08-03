import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { CreateRequestComponent } from './create-request/create-request.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendar';
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(CreateRequestComponent);
  }
}
