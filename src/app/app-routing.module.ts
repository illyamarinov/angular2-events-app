import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeModule } from './home/home.module';
import { EventModule } from './event/event.module';
import { NewEventModule } from './new-event/new-event.module';
import { ProfileModule } from './profile/profile.module';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => HomeModule },
  { path: 'event', loadChildren: () => EventModule },
  { path: 'event/new', loadChildren: () => NewEventModule },
  { path: 'profile', loadChildren: () => ProfileModule },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
