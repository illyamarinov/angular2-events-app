import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-comments',
  templateUrl: './event-comments.component.html',
  styleUrls: ['./event-comments.component.scss']
})
export class EventCommentsComponent implements OnInit {
  @Input() comments: string[];

  constructor() { }

  ngOnInit() {
  }

}
