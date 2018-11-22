import { Component, OnInit } from '@angular/core';

import { Event } from '@app-core/models/event.model';
import { EventService } from '@app-core/services/event/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events: Event[];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe((events: Event[]) => {
        this.events = events;
      });
  }
}
