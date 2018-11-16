import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventService } from './services/event/event.service';

// services and models
@NgModule({
  declarations: [],
  providers: [ EventService ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
