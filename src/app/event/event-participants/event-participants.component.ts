import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.scss']
})
export class EventParticipantsComponent implements OnInit {
  @Input() participants: string[];

  constructor() { }

  ngOnInit() {

  }

}
