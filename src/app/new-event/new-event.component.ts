import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';

import { User } from '@app-core/models/user.model';
import { EventService } from '@app-core/services/event/event.service';

const epmtyValidator = (control: FormControl): ValidationErrors | null => {
  return control.value.trim() === ''
    ? { 'empty': true }
    : null;
};

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  // form
  newEventForm: FormGroup;

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
  participants: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('participantInput') participantInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private eventService: EventService) {}

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

  submit() {
    // let newEvent = this.newEventForm.value;
    // newEvent = {
    //   ...newEvent,
    //   owner_id: this.newEventOwner.id,
    // };
    // newEvent.info.date += '';
    console.log(this.newEventForm.value);

    this.eventService.createEvent(this.newEventForm.value);
  }

}
