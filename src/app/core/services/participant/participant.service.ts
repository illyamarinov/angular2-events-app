import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { APIHelper } from '@app-core/services/api-helper';
import { User } from '@app/core/models/user.model';

@Injectable()
export class ParticipantService extends APIHelper {

  constructor(
    db: AngularFireDatabase,
  ) {
    super(db);
  }


  getParticipants(participantsIds: string[] = []): Observable<User[]> {
    const usersRefs: Observable<User>[] = participantsIds.map(
      (userId: string) => this.getObject<User>(`users/${userId}`)
    );
    return combineLatest(usersRefs);
  }
}
