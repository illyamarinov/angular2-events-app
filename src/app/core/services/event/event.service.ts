import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { mergeMap, map } from 'rxjs/operators';

import { Event } from '@app-core/models/event.model';
import { APIHelper } from '@app-core/services/api-helper';
import { UserService } from '@app-core/services/user.service';
import { CommentService } from '@app-core/services/comment.service';

@Injectable()
export class EventService extends APIHelper {

  constructor(
    db: AngularFireDatabase,
    private userService: UserService,
    private commentService: CommentService
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
          ...event,
          owner,
          comments
        }))
      );
  }
}
