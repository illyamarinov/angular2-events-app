import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { mergeMap, map } from 'rxjs/operators';

import { Event, defaultEvent } from '@app-core/models/event.model';
import { APIHelper } from '@app-core/services/api-helper';
import { UserService } from '@app-core/services/user/user.service';
import { CommentService } from '@app-core/services/comment/comment.service';
import { AuthService } from '@app-core/services/auth/auth.service';

@Injectable()
export class EventService extends APIHelper {

  constructor(
    db: AngularFireDatabase,
    private userService: UserService,
    private commentService: CommentService,
    private authService: AuthService
  ) {
    super(db);
  }

  getEvents(): Observable<Event[]> {
    return this.getList<Event>('events');
  }

  getEventById(id: string): Observable<Event> {
    return this.getObject<Event>(`events/${id}`)
      .pipe(
        mergeMap((event: Event) => {
          return combineLatest(
            of(event),
            this.userService.getUserById(event.owner_id),
            this.commentService.getComments(id)
          );
        }),
        map(([event, owner, comments]) => ({
          ...defaultEvent,
          ...event,
          owner,
          comments
        }))
      );
  }



  createEvent(event: Event) {
    const getUserId = this.authService.getUserId();

    event = {
      ...event,
      owner_id: getUserId
    };
    event.info.date += '';
    this.db.list('events').push(event);
  }
}
