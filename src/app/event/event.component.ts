import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EventService } from '@app-core/services/event/event.service';
import { SnackBarService } from '@app-core/services/snackBar/snackBar.service';
import { Event } from '@app-core/models/event.model';
import { Comment } from '@app-core/models/comment.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  id: string;
  event: Event;
  comments: Comment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit() {

    this.id = this.route.children[0].snapshot.params['eventId'];

    this.eventService.getEventById(this.id)
      .subscribe(
        (event: Event) => {
          this.event = event;
        },
        () => {
          this.router.navigateByUrl('/');
          this.snackBarService.show();
        }
      );
  }

}
