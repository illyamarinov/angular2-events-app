import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app-shared/material.module';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { EventDescriptionComponent } from './event-description/event-description.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { EventCommentsComponent } from './event-comments/event-comments.component';
import { EventParticipantsComponent } from './event-participants/event-participants.component';

@NgModule({
  declarations: [
    EventComponent,
    EventDescriptionComponent,
    EventInfoComponent,
    EventCommentsComponent,
    EventParticipantsComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    MaterialModule
  ]
})
export class EventModule { }
