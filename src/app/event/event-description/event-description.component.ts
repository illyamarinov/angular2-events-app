import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.scss']
})
export class EventDescriptionComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() imgUrl: string;
  @Input() creatorName: string;


  constructor() { }

  ngOnInit() {
  }

}
