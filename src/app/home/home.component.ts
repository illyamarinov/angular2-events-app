import { Component, OnInit, TrackByFunction, OnDestroy } from '@angular/core';

import { Event } from '@app-core/models/event.model';
import { EventService } from '@app-core/services/event/event.service';
import { trackById } from '@app/shared/utils';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  events: Event[];
  trackById: TrackByFunction<any> = trackById;

  private destroySubject: Subject<void>;

  constructor(private eventService: EventService) {
    this.destroySubject = new Subject<void>();
  }

  ngOnInit() {
    this.eventService.getEvents()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((events: Event[]) => {
        this.events = events;
      });
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
