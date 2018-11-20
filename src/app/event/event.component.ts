import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EventService } from '@app-core/services/event/event.service';
import { SnackBarService } from '@app-core/services/snackBar/snackBar.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  id: number;
  event = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {

    this.id = +this.route.children[0].snapshot.params['eventId'];

    // this.eventService.getEvents();
    this.eventService.getEventById(this.id)
      .subscribe(
        (value) => {
          if (value !== undefined) {
            this.event = value;
          }
        },
        () => {
          this.router.navigateByUrl('/');
          this.snackBarService.show();
        }
      );
  }

}
