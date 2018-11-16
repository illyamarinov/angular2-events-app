import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../core/models/event.model';
// import { EventService } from '../core/services/event/event.service';
import { mockEvents } from '../core/services/event/mocks';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: Event[] = mockEvents;

  // constructor(private eventService: EventService) {}
  constructor(private router: Router) {}

  ngOnInit() {
    // this.eventService.getEvents()
    //   .subscribe((events: Event[]) => {
    //     this.events = events;
    //   });
  }

  navigateToEvent(id: string): void {
    this.router.navigateByUrl(`/event/${id}`);
  }

}
