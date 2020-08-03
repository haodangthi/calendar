import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
//import { StoreModule } from '@ngrx/store';
//import { reducers, metaReducers } from './reducers';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { calendarReducer } from './calendar.reducer';
import { CalendarService } from './sevices/calendar.service';
@NgModule({
  declarations: [AppComponent, CalendarComponent, CreateRequestComponent],

  entryComponents: [CreateRequestComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,

    StoreModule.forRoot({ calendar: calendarReducer })
  ],
  providers: [CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule {}
