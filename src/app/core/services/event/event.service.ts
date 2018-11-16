import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Event } from '@app-core/models/event.model';
import { mockEvents } from './mocks';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  getEvents(): Observable<Event[]> {
    return of(mockEvents);
  }
}
