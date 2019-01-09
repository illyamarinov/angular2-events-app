import { Component, OnInit, Input, TrackByFunction } from '@angular/core';

import { trackById } from '@app/shared/utils';

@Component({
  selector: 'app-event-comments',
  templateUrl: './event-comments.component.html',
  styleUrls: ['./event-comments.component.scss']
})
export class EventCommentsComponent implements OnInit {
  @Input() comments: string[];

  trackById: TrackByFunction<any> = trackById;

  constructor() { }

  ngOnInit() {
  }

}
