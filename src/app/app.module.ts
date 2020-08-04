import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { StoreModule } from '@ngrx/store';
import { CalendarService } from './services/calendar.service';
import { DateService } from './services/date.service';

// ngrx data
import { HttpClientModule } from '@angular/common/http';
import { EntityDataModule, DefaultDataServiceConfig } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { ChangeRequestComponent } from './components/change-request/change-request.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CreateRequestComponent,
    ChangeRequestComponent
  ],

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
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    EntityDataModule.forRoot(entityConfig)

    //StoreModule.forRoot({ calendar: calendarReducer })
  ],
  providers: [
    CalendarService,
    DateService,
    {
      provide: DefaultDataServiceConfig,
      useValue: {
        root: 'http://localhost:3004/'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

//npm i @ngrx/effects @ngrx/entity @ngrx/data @ngrx/store @ngrx/store-devtools
//npm i json-server
//add to imports

// EffectsModule.forRoot([]),
// StoreModule.forRoot({}),
// EntityDataModule.forRoot(entityConfig)
