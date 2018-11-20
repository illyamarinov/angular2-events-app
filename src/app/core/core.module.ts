import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventService } from './services/event/event.service';
import { SnackBarService } from './services/snackBar/snackBar.service';

// services and models
@NgModule({
  declarations: [],
  providers: [ EventService, SnackBarService ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
