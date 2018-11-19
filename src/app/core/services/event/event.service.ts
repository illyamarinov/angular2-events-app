import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';

import { Event } from '@app-core/models/event.model';
import { CONSTANTS } from '@app-shared/constants';

import { getResponseBody, getById } from '@app-core/services/service-utils';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: Http) { }

  getEvents(): Observable<Event[]> {
    return this.http.get(`${CONSTANTS.API_URL}events`)
      .pipe(getResponseBody);
  }

  // getEvents(): Observable<Event[]> {
  //   return of(mockEvents);
  // }

  getEvent(id: number): Observable<Event> {
    return this.http.get(`${CONSTANTS.API_URL}events`)
      .pipe(getResponseBody, getById(id));
  }
}
