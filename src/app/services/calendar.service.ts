import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class CalendarService extends EntityCollectionServiceBase<Appointment> {
  calendar$: Observable<Appointment>;
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Appointment', serviceElementsFactory);
  }
}
