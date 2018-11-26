import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {
  @Input() info;

  constructor() { }

  ngOnInit() {
    this.calcTime();
  }

  calcTime() {
    const time = new Date(this.info.time);
    this.info.time = `${time.getHours()}:${time.getMinutes()}`;
  }
}
