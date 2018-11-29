import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators/map';
import { AngularFireDatabase } from '@angular/fire/database';

import { Comment } from '@app-core/models/comment.model';
import { APIHelper } from '@app-core/services/api-helper';
import { UserService } from '@app-core/services/user/user.service';
import { User } from '@app/core/models/user.model';

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
        map((comments, index) => {
          return comments.length ? comments[index] : {};
        }),
        mergeMap((comment: Comment) => {
          console.log(comment);
          const userRef = !!comment
            ? this.userService.getUserById(comment.owner_id)
            : of(<User>{});
          return combineLatest(of(comment), userRef);
        }),
        map(([comment, owner]) => {
          return [{
            ...comment,
            owner_name: owner.name
          }];
        })
      );
  }
}
