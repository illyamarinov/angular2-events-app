import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EventService } from '@app-core/services/event/event.service';
import { SnackBarService } from '@app-core/services/snackBar/snackBar.service';
import { Event } from '@app-core/models/event.model';

const mockComments = [];

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  id: number;
  event: Event = <Event>{};
  // coments: Comment[] = mockComments;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {

    this.id = +this.route.children[0].snapshot.params['eventId'];

    this.eventService.getEventById(this.id)
      .subscribe(
        (value: Event) => {
          this.event = value;
          console.log(this.event);
        },
        () => {
          this.router.navigateByUrl('/');
          this.snackBarService.show();
        }
      );
  }

}
