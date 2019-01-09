import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';

import { User } from '@app-core/models/user.model';
import { Event } from '@app-core/models/event.model';
import { EventService } from '@app-core/services/event/event.service';
import { Subscription, ReplaySubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

const epmtyValidator = (control: FormControl): ValidationErrors | null => {
  return control.value.trim() === ''
    ? { 'empty': true }
    : null;
};

@AutoUnsubscribe()
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit, OnDestroy {
  //
  destroy: Observable<any> = new ReplaySubject<any>(1);

  // array with all subscribes
  subscriptions: Subscription = new Subscription();

  // array with all events of
  events: Event[];

  // flag for checking if event was added -> go to this event page
  isEventUpdate = false;


  // form
  newEventForm: FormGroup;
  destroyFlag = true;

  // info
  cities: string[] = ['Minsk', 'Grodno', 'Gomel', 'Mogilev', 'Brest', 'Vitebsk'];

  // participants
  separatorKeysCodes: number[] = [ENTER, COMMA];

  newEventOwner: User = {
    name: 'Chack 1',
    id: '-LRuxC_3Bxj6keYnY4BT'
  };

  allUsers: User[] = [{
    name: 'Chack 1',
    id: '-LRuxC_3Bxj6keYnY4BT'
  }, {
    name: 'Chack 2',
    id: '-LRuxC_6lY-LFWqgVjfK'
  }];

  tempEvent: Event = {
    title: 'temp title',
    description: 'temp description',
    info: {
      date: 'temp date',
      time: 'temp time',
      location: 'temp location'
    },
    owner_id: this.newEventOwner.id
  };

  participants: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('participantInput') participantInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor (
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.newEventForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        epmtyValidator
      ]),
      info: new FormGroup({
        date: new FormControl('', Validators.required),
        location: new FormControl('', [Validators.required]),
        time: new FormControl('', [Validators.required]),
      }),
      description: new FormControl('', Validators.required),
      participant_ids: new FormControl([this.newEventOwner.id])
    });

    // this.eventService.createEvent(this.tempEvent);

    this.subscriptions.add(this.eventService.getEvents()
      .subscribe(
        (events) => {
          this.events = events;
          console.log(events);
          if (this.isEventUpdate) {
            this.goToEvent(this.events[this.events.length - 1].id);
          }
        }
      )
    );

    // this.eventService.getEvents()
    //   .pipe(takeUntil(this.destroy))
    //   .subscribe(
    //     (events) => {
    //       this.events = events;
    //       console.log(events);
    //       if (this.isEventUpdate) {
    //         this.goToEvent(this.events[this.events.length - 1].id);
    //       }
    //     }
    //   );
  }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }

  add(event: MatChipInputEvent): void {
    // Add participant only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      const participantsList = this.newEventForm.controls['participant_ids'].value;

      // Add our participant
      if ((value || '').trim()) {
        this.participants.push(value.trim());
        participantsList.push(
          participantsList.length + 1 + ''
        );
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  remove(participant: string): void {
    const index = this.participants.indexOf(participant);
    const participantsList = this.newEventForm.controls['participant_ids'].value;

    if (index >= 0) {
      this.participants.splice(index, 1);
      participantsList.splice(index + 1, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const user = event.option.value;
    this.participants.push(user.name);
    const participantsList = this.newEventForm.controls['participant_ids'].value;

    participantsList.push(user.id);
    this.participantInput.nativeElement.value = '';
  }

  goToEvent(title) {
    this.router.navigate([`/event/${title}`]);
  }

  submit() {
    this.eventService.createEvent(this.newEventForm.value);
    this.isEventUpdate = true;
    console.log('success creating');
  }
}
