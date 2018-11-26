import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { User } from '@app-core/models/user.model';
import { APIHelper } from '@app-core/services/api-helper';

@Injectable()
export class UserService extends APIHelper {

  constructor(db: AngularFireDatabase) {
    super(db);
  }

  getUserById(id: string): Observable<User> {
    return this.getObject<User>(`users/${id}`);
  }
}
