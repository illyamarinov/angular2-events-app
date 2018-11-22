import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

import { Event } from '@app-core/models/event.model';
import { getResponseBody, getById } from '@app-core/services/service-utils';
import { API_URL } from '@app-shared/constants';


@Injectable()
export class EventService {

  constructor(private http: Http) { }

  getEvents(): Observable<Event[]> {
    return this.http.get(`${API_URL}/events`)
      .pipe(getResponseBody);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get(`${API_URL}/events/${id}`)
      .pipe(getResponseBody);
  }
}
