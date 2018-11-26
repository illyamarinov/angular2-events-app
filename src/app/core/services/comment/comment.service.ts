import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators/map';
import { AngularFireDatabase } from '@angular/fire/database';

import { Comment } from '@app-core/models/comment.model';
import { APIHelper } from '@app-core/services/api-helper';
import { UserService } from '@app-core/services/user/user.service';

@Injectable()
export class CommentService extends APIHelper {

  constructor(
    db: AngularFireDatabase,
    private userService: UserService,
  ) {
    super(db);
  }


  getComments(eventId: string): Observable<Comment[]> {
    return this.getList<Comment>(`comments/${eventId}`)
      .pipe(
        map((comment, index) => {
          return comment[index];
        }),
        mergeMap((comment: Comment) => {
          return combineLatest(
            of(comment),
            this.userService.getUserById(comment.owner_id)
          );
        }),
        map(([comment, owner]) => {
          return [{
            ...comment,
            owner_name: owner['name']
          }];
        })
      );
  }
}
