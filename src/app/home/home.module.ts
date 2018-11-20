import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app-shared/material.module';
import { HomeRoutingModule } from '@app/home/home-routing.module';
import { HomeComponent } from '@app/home/home.component';
import { EventCardComponent } from './event-card/event-card.component';

@NgModule({
  declarations: [HomeComponent, EventCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    MaterialModule
  ]
})
export class HomeModule { }
