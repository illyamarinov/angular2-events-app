import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { Comment } from '@app-core/models/comment.model';
import { APIHelper } from '@app-core/services/api-helper';

@Injectable()
export class CommentService extends APIHelper {

  constructor(db: AngularFireDatabase) {
    super(db);
  }

  getComments(eventId: string): Observable<Comment[]> {
    return this.getList<Comment>(`comments/${eventId}`)
      .pipe(
        
      );
  }
}
