import { Component, OnInit, Input } from '@angular/core';

import { ParticipantService } from '@app-core/services/participant/participant.service';
import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.scss']
})
export class EventParticipantsComponent implements OnInit {
  @Input() participantsId: string[];

  participants: User[] = [];

  constructor(
    private participantService: ParticipantService
  ) { }

  ngOnInit() {
    this.participantService.getParticipants(this.participantsId)
      .subscribe(
        (value: User[]) => {
          this.participants = value;
        },
        () => {
          console.log('error');
        }
      );
  }


}
