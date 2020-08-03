import { TestBed, async } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import calendar from '../calendarState';
import { CalendarService } from './calendar.service';
import { of } from 'rxjs';

describe('CalendarService', () => {
  let service: CalendarService;
  const initialState = calendar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: CalendarService,
          useValue: { calendar$: of({ appointments: [] }) }
        }
      ]
    }).compileComponents();

    service = TestBed.inject(CalendarService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
