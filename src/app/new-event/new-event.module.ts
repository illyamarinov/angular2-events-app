import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/material.module';
import { NewEventRoutingModule } from './new-event-routing.module';
import { NewEventComponent } from './new-event.component';

@NgModule({
  declarations: [
    NewEventComponent
  ],
  imports: [
    CommonModule,
    NewEventRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class NewEventModule {

}
