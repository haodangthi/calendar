import { TestBed, async } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { CalendarService } from './calendar.service';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from '../entity-metadata';

import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        HttpClientModule,
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot(entityConfig)
      ],
      declarations: [],
      providers: []
    }).compileComponents();

    service = TestBed.inject(CalendarService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
