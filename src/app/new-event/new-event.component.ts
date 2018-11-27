import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { User } from '@app/core/models/user.model';

const customValidator = (control: FormControl): ValidationErrors | null => {
  return control.value === '123'
    ? { '123-title': true }
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
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  participants: string[] = ['Chack 1'];
  allUsers: User[] = [{
    name: 'Chack 1',
    id: '1'
  }, {
    name: 'Chack 2',
    id: '2'
  }];

  @ViewChild('participantInput') participantInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {}

  ngOnInit() {
    this.newEventForm = new FormGroup({
      title: new FormControl('', [Validators.required, customValidator]),
      info: new FormGroup({
        date: new FormControl(''),
        city: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'blur'
        }),
        time: new FormControl(''),
      }),
      desciption: new FormControl(''),
      participants_ids: new FormControl('')
    });
  }

  add(event: MatChipInputEvent): void {
    // // Add participant only when MatAutocomplete is not open
    // // To make sure this does not conflict with OptionSelected Event
    // if (!this.matAutocomplete.isOpen) {
    //   const input = event.input;
    //   const value = event.value;
    //
    //   // Add our participant
    //   if ((value || '').trim()) {
    //     this.participants.push(value.trim());
    //   }
    //
    //   // Reset the input value
    //   if (input) {
    //     input.value = '';
    //   }
    // }
  }

  remove(participant: string): void {
    const index = this.participants.indexOf(participant);

    if (index >= 0) {
      this.participants.splice(index, 1);
    }
    // remove from control
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const user = event.option.value;
    this.participants.push(user.name);
    const participantsIds = this.newEventForm.controls['participants_ids'].value;
    participantsIds.push(user.id);
    this.newEventForm.controls['participants_ids'].setValue(participantsIds);
  }

  submit() {
    console.log(this.newEventForm.value);
  }

}
